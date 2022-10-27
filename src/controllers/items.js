const express = require('express');
const db = require('../../config/database');

exports.getAllItems = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const offset = (page - 1) * limit;

        if(page)
        {
            const itemsCount = (await db.any('SELECT * FROM items ORDER BY id DESC')).length;
            if(offset >= itemsCount) throw new Error("This page doesn't exist");
        }
        const allItems = await db.any('SELECT * FROM items ORDER BY id DESC LIMIT $(limit) OFFSET $(offset)', {limit, offset});
        res.status(201).json({
            status: 'success',
            message: allItems
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.createItem = async (req, res) => {
    try {
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
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.isValid = (req, res, next) => {
    if(isNaN(req.params.id)) {
        res.status(404).json({
            status: 'fail',
            message: 'provide a valid item number'
        })
    } else {
        next();
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id * 1;
        await db.one('DELETE FROM items WHERE id = $(id) RETURNING id', {id});
        res.status(204).json({
            status: 'success',
            message: null
        })
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
