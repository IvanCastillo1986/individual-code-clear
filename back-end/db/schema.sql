DROP DATABASE IF EXISTS test_dev;
CREATE DATABASE test_dev;
\c test_dev;
-- DROP TABLE IF EXISTS test;

CREATE TABLE test (
    id SERIAL PRIMARY KEY, 
    name TEXT
);