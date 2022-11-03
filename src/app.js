const express = require('express');
const itemRouter = require('./routes/items');
const userRouter = require('./routes/users');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use('/items', itemRouter);
app.use('/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server! Kindly reconfirm URL!`), 404);
});

app.use(globalErrorHandler);

module.exports = app;