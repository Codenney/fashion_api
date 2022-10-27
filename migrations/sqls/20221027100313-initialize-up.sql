/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS public.users(
	id SERIAL NOT NULL PRIMARY KEY, 
	name VARCHAR(50) NOT NULL, 
	email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL UNIQUE
);