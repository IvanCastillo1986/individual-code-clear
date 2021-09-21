DROP DATABASE IF EXISTS code_clear_dev;
CREATE DATABASE code_clear_dev;
\c code_clear_dev;

DROP TABLE IF EXISTS stats;
CREATE TABLE stats (
  id SERIAL PRIMARY KEY, 
  uid TEXT,
  email VARCHAR(100) UNIQUE,
  messageId TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  severity INT,
  rating INT
);