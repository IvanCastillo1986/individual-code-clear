DROP DATABASE IF EXISTS production_database_name;
CREATE DATABASE production_database_name;

\c production_database_name;

DROP TABLE IF EXISTS test;
CREATE TABLE test (
    id SERIAL PRIMARY KEY, 
    name TEXT
);