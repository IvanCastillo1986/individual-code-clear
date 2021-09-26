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
  source_code TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  severity INT,
  rating INT
);

-- DROP TABLE IF EXISTS projects;
-- CREATE TABLE projects (
--   id SERIAL PRIMARY KEY, 
--   project_name TEXT NOT NULL,
--   contents TEXT NOT NULL,
--   date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- )
