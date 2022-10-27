const app = require('./src/app');
const db = require('./config/database')

// db.one('SELECT * FROM items WHERE name = $1', 'alvicci')
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

module.exports = db;

app.listen(PORT, () => {
    console.log(`The app is currently running on localhost:${PORT}...`);
})
