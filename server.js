const pgp = require('pg-promise')(/*options*/);
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./src/app');

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

db.one("SELECT $1 AS value", 111)
    .then(function (result) {
        console.log('Connected to DB successfully');
    })
    .catch(function (error) {
        console.log({
            message: "Couldn't connect to DB successful",
            error: error});
        });
        
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The app is currently running on localhost:${PORT}...`);
})
