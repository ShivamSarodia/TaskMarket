from flask import Flask, render_template, request, g, make_response
import sqlite3

app = Flask(__name__)

@app.route("/")
def main():
    task_list = [{"title": task['title'],
                  "salary": task['salary'],
                  "distance": "",
                  "requester": query_db("select * from users where fb_user_id = ?", [task["poster_id"]], True)['fullName'],
                  "address": task['addr'],
                  "description": task['description'],
                  "lat": task['lat'],
                  "lng": task['lon'],
                  "id": task["task_id"]
    } for task in query_db("select * from tasks where status='pending'")]
    return render_template('main.html', task_list = task_list)

@app.route("/create-task")
def create_task():
    return render_template('create_task.html')

@app.route("/profile")
def profile():
    uid = request.cookies.get('uid')
    print(uid)
    fullname = query_db("select * from users where fb_user_id = ?", [uid], True)['fullName']
    jobs = [query_db("select * from tasks where task_id=? and status='accepted'", [task['task_id']], True)
                for task in query_db("select * from tasks_accepted where user_id=?", [uid])]
    jobs = filter(lambda x: (x is not None), jobs)
    cur_jobs = [{"title": job["title"],
                 "employer": query_db("select * from users where fb_user_id = ?", [job["poster_id"]], True)['fullName'],
                 "salary": job["salary"],
                 "status": job["status"],
                 "address": job["addr"],
                 "description": job["description"],
                 "id": job["task_id"]} for job in jobs]

    pjobs = [query_db("select * from tasks where task_id=?", [task['task_id']], True)
                for task in query_db("select * from tasks_made where user_id=?", [uid])]
    
    posted_jobs = []
    for job in pjobs:
        qval = query_db("select * from users where fb_user_id = ?", [job["accepter_id"]], True)
        accepted = ""
        if qval: accepted = qval['fullName']

        posted_jobs.append({"title": job["title"],
                            "accepted_by": accepted,
                            "salary": job["salary"],
                            "status": job["status"],
                            "address": job["addr"],
                            "description": job["description"],
                            "id": job["task_id"]})
        
    return render_template("profile.html", fullname=fullname, cur_jobs = cur_jobs, posted_jobs = posted_jobs)

@app.route("/login-back", methods = ['POST'])
def login():
    print("LOGIN!!!")
    print(request.form["accessToken"])
    if request.method == "POST":
        uid = request.form["uid"]
        accessToken = request.form["accessToken"]
        fullname = request.form["fullName"]

        if len(query_db("select * from users where fb_user_id = ?", [uid])) == 0: #if the user doesn't exist
              print("Adding new user")
              query_db("insert into users (fb_user_id, fullname) values (?, ?)", [uid, fullname])

        resp = make_response("success")
        resp.set_cookie("uid", uid)
        return resp
    else:
        print("Not a POST")
        return ""

@app.route("/make-task-back", methods = ['POST'])
def make_task():
    if request.method == "POST":
        status = "pending"
        title = request.form["title"]
        description = request.form["description"]
        salary = request.form["salary"]
        lat = request.form["lat"]
        lon = request.form["lon"]
        addr = request.form["address"]
        poster_id = request.form["uid"]

        query_db("insert into tasks (status, title, description, salary, lat, lon, addr, poster_id) values (?, ?, ?, ?, ?, ?, ?, ?)", [status, title, description, salary, lat, lon, addr, poster_id])

        task_id = query_db("select last_insert_rowid();", one=True)[0]
        query_db("insert into tasks_made (user_id, task_id) values (?, ?)", [poster_id, task_id])

        return "success"
    else:
        print("Not a POST")
        return ""

@app.route("/accept-task-back", methods = ['POST'])
def accept_task():
    if request.method == "POST":
        task_id = request.form["tid"]
        user_id = request.cookies.get('uid')
        query_db("update tasks set status = 'accepted', accepter_id = ? where task_id = ?", [user_id, task_id])
        query_db("insert into tasks_accepted (user_id, task_id) values (?, ?)", [user_id, task_id])
        return "success"
    else:
        print("Not a POST")
        return ""

@app.route("/profile-back", methods = ['POST'])
def profile_back():
    if request.method == "POST":
        task_id = request.form["tid"]
        action = request.form["action"]
        user_id = request.cookies.get('uid')

        if action == "cancel_posted":
            query_db("delete from tasks where task_id = ?", [task_id])
            query_db("delete from tasks_made where task_id=?", [task_id])
            query_db("delete from tasks_accepted where task_id=?", [task_id])
        elif action == "pay_posted":
            query_db("update tasks set status = 'completed' where task_id = ?", [task_id])
        elif action == "cancel_current":
            query_db("update tasks set status = 'pending', accepter_id = '' where task_id = ?", [task_id])
        elif action == "complete_current":
            query_db("update tasks set status = 'completed-paid' where task_id = ?", [task_id])

        return "success"
    else:
        print("Not a POST")
        return ""

##### DATABASE STUFF ######

DATABASE = 'db/database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('db/schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    get_db().commit()
    cur.close()
    return (rv[0] if rv else None) if one else rv

@app.teardown_appcontext
def close_connection(exception):
    print("Closed connection")
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

if __name__ == "__main__":
    app.run(debug = True)
 
