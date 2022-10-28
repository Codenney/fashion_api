const express = require('express');
const db = require('../../config/database');

exports.createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const newUser = await db.one('INSERT INTO users(name, email, password) VALUES(${name}, ${email}, ${password}) RETURNING id', {
            name: name, 
            email: email, 
            password: password
        });
        res.status(201).json({
            status: 'success',
            message: newUser
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};