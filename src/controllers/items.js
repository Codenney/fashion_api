const db = require('../../config/database');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllItems = catchAsync(async (req, res, next) => {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const offset = (page - 1) * limit;

        if(page)
        {
            const itemsCount = (await db.any('SELECT * FROM items ORDER BY id DESC')).length;
            if(offset > itemsCount) return next(new AppError("This page doesn't exist", 404)) 
        }
        const allItems = await db.any(`SELECT * FROM items ORDER BY id DESC LIMIT $(limit) OFFSET $(offset)`, {limit, offset});
        res.status(200).json({
            status: 'success',
            message: allItems
        })
    })

exports.createItem = catchAsync(async (req, res, next) => {
        const {name, type, gender, color} = req.body;
        const newItem = await db.one('INSERT INTO items(name, type, gender, color) VALUES(${name}, ${type}, ${gender}, ${color}) RETURNING id', {
            name: name, 
            type: type, 
            gender: gender, 
            color: color
        });
        res.status(201).json({
            status: 'success',
            message: newItem
        })
    });

exports.isValid = (req, res, next) => {
    if(isNaN(req.params.id)) return next(new AppError('provide a valid item number', 404));
    else next();
}

exports.deleteItem = catchAsync(async (req, res, next) => {
        const id = req.params.id * 1;
        await db.one('DELETE FROM items WHERE id = $(id) RETURNING id', {id});
        res.status(204).json({
            status: 'success',
            message: null
        })
    });

exports.updateItem = catchAsync(async (req, res, next) => {
        const {name, type, gender, color, id} = req.body;
        const updateOne = await db.one('UPDATE Items SET name = ${name}, type = ${type}, gender = ${gender}, color = ${color} WHERE id = ${id} RETURNING id', 
        {name, type, gender, color, id});
        res.status(200).json({
            status: 'success',
            message: 'Update successful!'
        });
});