const express = require('express');
const db = require('../../config/database');

// exports.getAllItems = async (req, res) = {}

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
