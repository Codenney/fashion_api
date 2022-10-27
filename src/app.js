const express = require('express');

const app = express();

app.use(express.json());

app.get('*', (req, res) => {
    res.status(401).json({
        status: 'fail',
        message: 'Page not found! Kindly reconfirm URL!',
    });
});

module.exports = app;