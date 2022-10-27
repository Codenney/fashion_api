const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The app is currently running on localhost:${PORT}...`);
})