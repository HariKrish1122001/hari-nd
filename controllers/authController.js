// const RegisterModel = require('../models/register');
// const jwt = require('jsonwebtoken');
// const errorHandler = (error, res) => {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
// };
// const register = async (req, res) => {
//     const { username, accNo, password } = req.body;
//     try {
//         const newRegister = new RegisterModel({ username, accNo, password });
//         await newRegister.save();
        
//         res.status(201).json({ message: 'Registration successful' });
//     } catch (error) {
//         errorHandler(error, res);
//     }
// };
// const login = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const existingRegister = await RegisterModel.findOne({ username });
//         if (!existingRegister || !(await existingRegister.comparePassword(password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign(
//             { id: existingRegister._id, username: existingRegister.username },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );
//         res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         errorHandler(error, res);
//     }
// };
// module.exports = { register, login };



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
    const { username, accNo, password } = req.body;
    try {
        if (!password) return res.status(400).json({ message: 'Password is required' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Register({ username, accNo, password: hashedPassword });
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
        if (!user) return res.status(401).json({ message: 'Invalid account number or password' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid account number or password' });
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};