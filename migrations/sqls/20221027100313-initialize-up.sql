/* Replace with your SQL commands */
--DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
	id SERIAL NOT NULL PRIMARY KEY, 
	name VARCHAR(50) NOT NULL, 
	email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL UNIQUE
);


--DROP TABLE IF EXISTS items;

--CREATE TYPE size AS ENUM ('M', 'S', 'L');
--CREATE TYPE gender AS ENUM ('Male', 'Female');
CREATE TABLE IF NOT EXISTS items(
	id SERIAL NOT NULL PRIMARY KEY, 
	name VARCHAR(50) NOT NULL, 
	type VARCHAR(100) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL
);

INSERT INTO items (name, type, gender, color) VALUES('Alvicci', 'shirt', 'Male', 'white');
INSERT INTO items (name, type, gender, color) VALUES('Olaide', 'gown', 'Female', 'purple');
