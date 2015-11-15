DROP TABLE IF EXISTS users;
CREATE TABLE users (
       int_user_id INTEGER PRIMARY KEY autoincrement,
       fb_user_id text NOT NULL,
       fullname text NOT NULL
);

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
  task_id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  salary REAL NOT NULL,
  lat REAL DEFAULT NULL,
  lon REAL DEFAULT NULL,
  addr TEXT DEFAULT NULL,
  poster_id TEXT NOT NULL,
  accepter_id INTEGER DEFAULT NULL,
  time_made DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS tasks_accepted;
CREATE TABLE tasks_accepted (
  user_id TEXT NOT NULL,
  task_id TEXT NOT NULL
);

DROP TABLE IF EXISTS tasks_made;
CREATE TABLE tasks_made (
  user_id TEXT NOT NULL,
  task_id TEXT NOT NULL
);
