const db = require('../../config/database');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.createUser = async (req, res) => {
    try {
        let {name, email, password} = req.body;
        // const userEmail = await db.one('SELECT * FROM users WHERE email = $1', email);
        if(email) {
            const userName = (await db.oneOrNone('SELECT name FROM users WHERE email = $1', email));
            if(userName) throw new Error("User with the provide details exist");
        }
        password = await bcrypt.hash(password, 12);
        const token = jwt.sign({userEmail: email}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN});
        console.log(token);
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