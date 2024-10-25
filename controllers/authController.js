const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Register = require('../models/Register');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};

exports.register = async (req, res) => {
    const { username, accNo, password, role } = req.body; 
    try {
        if (!password) return res.status(400).json({ message: 'Password is required' });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Register({ username, accNo, password: hashedPassword, role }); 
        
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { accNo, password } = req.body;

    try {
        const user = await Register.findOne({ accNo });
        if (!user) {
            return res.status(401).json({ message: 'Invalid account number or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid account number or password' });
        }

        const tokenPayload = { id: user._id, role: user.role };
        const tokenOptions = { expiresIn: '1h' };
        const token = jwt.sign(tokenPayload, JWT_SECRET, tokenOptions);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });
        res.status(200).json({ message: 'Login successful', token, user: { username: user.username, accNo: user.accNo, role: user.role } });
    } catch (error) {
        errorHandler(error, res);
    }
};
