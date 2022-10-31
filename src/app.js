const express = require('express');
const itemRouter = require('./routes/items');
const userRouter = require('./routes/users');
const { handleError } = require('./utils/errors')

const app = express();

app.use(express.json());

app.use('/items', itemRouter);
app.use('/users', userRouter);

app.get('*', (req, res) => {
    res.status(401).json({
        status: 'fail',
        message: 'Page not found! Kindly reconfirm URL!',
    });
});

app.use(handleError);

module.exports = app;