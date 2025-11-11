CREATE TABLE IF NOT EXISTS applicants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  about TEXT,
  skills TEXT,
  location TEXT,
  cv_filename TEXT
);