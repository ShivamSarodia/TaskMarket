import sqlite3
from flask import Flask, render_template, request, g

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('main.html')

@app.route("/login", methods = ['GET', 'POST'])
def login():
    if request.method == "POST":
        print(request.form["uid"])
        print(request.form["accessToken"])
    else:
        print("Not a POST")
    return ""

if __name__ == "__main__":
    app.run(debug = True)
 
