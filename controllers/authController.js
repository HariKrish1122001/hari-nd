const RegisterModel = require('../models/register');
const jwt = require('jsonwebtoken');
const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};
const register = async (req, res) => {
    const { username, accNo, password } = req.body;
    try {
        const newRegister = new RegisterModel({ username, accNo, password });
        await newRegister.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        errorHandler(error, res);
    }
};
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingRegister = await RegisterModel.findOne({ username });
        if (!existingRegister || !(await existingRegister.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: existingRegister._id, username: existingRegister.username },
            process.env.JWT_SECRET
        );
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        errorHandler(error, res);
    }
};
module.exports = { register, login };