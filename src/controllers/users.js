const db = require('../../config/database');
// const dotenv = require('dotenv');
// dotenv.config({path: './config.env'});
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// function to compare passwords if correct
const correctPassword = async (providedPassword, userPassword) => {
    return await bcrypt.compare(providedPassword, userPassword);
}

// function to create a sign in token for the user
const signToken = ({email}) => {
    return jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN})
}

exports.createUser = async (req, res) => {
    try {
        let {name, email, password} = req.body;
        if(email) {
            const userName = (await db.oneOrNone('SELECT name FROM users WHERE email = $1', email));
            if(userName) throw new Error("User with the provide details exist");
        }
        password = await bcrypt.hash(password, 12);
        const token = jwt.sign({userEmail: email}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN});
        const newUser = await db.one('INSERT INTO users(name, email, password) VALUES(${name}, ${email}, ${password}) RETURNING id', {
            name: name, 
            email: email, 
            password: password
        });
        res.status(201).json({
            status: 'success',
            token: token,
            message: newUser
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        // confirm email and password were provided
        if(!email || !password) throw new Error("Please provide email and password");

        // Check if the email exist on the DB
        const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', email);

        // Check if provided password is correct and user exist on the DB
        if(!user || !(await correctPassword(password, user.password))) {
            throw new Error("Incorrect email or password");
        };

        // If everything is ok, send token to the client
        const token = signToken({email});
        res.status(200).json({
            status: 'success',
            token
        })
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: err
        })
    }
};