DROP DATABASE IF EXISTS code_clear_dev;
CREATE DATABASE code_clear_dev;
\c code_clear_dev;

DROP TABLE IF EXISTS stats;
CREATE TABLE stats (
  id SERIAL PRIMARY KEY, 
  uid TEXT,
  email VARCHAR(100) UNIQUE,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  severity_level INT,
  rating INT
);