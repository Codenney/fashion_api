const pgp = require('pg-promise')(/*options*/);
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const DB_PORT = process.env.DB_PORT;
const PASSWORD = process.env.PASSWORD;

const cn = {
    host: 'localhost',
    port: DB_PORT,
    database: 'fashiondb',
    user: 'postgres',
    password: PASSWORD
};

const db = pgp(cn);

module.exports = db;