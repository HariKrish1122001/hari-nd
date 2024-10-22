const { Admin } = require('../models/Admin');
const Register = require('../models/Register');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};
const adminLogin = async (req, res) => {
    const { accNo, password } = req.body;
    try {
        const admin = await Admin.findOne({ accNo });
        if (!admin) return res.status(401).json({ message: 'Invalid account number or password' });
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid account number or password' });
        const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged in successfully'});
    } catch (error) {
        errorHandler(error, res);
    }
};
const adminDeposit = async (req, res) => {
    const { amount, accNo } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid transaction amount' });
    }
    try {
        const user = await Register.findOne({ accNo });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const transaction = new Transaction({
            amount,
            type: 'deposit',
            username: user.username,
            user_id: user._id,
        });
        user.currentbalance += amount;
        await transaction.save();
        await user.save();
        res.status(201).json({ message: 'Deposit successful', transaction });
    } catch (error) {
        errorHandler(error, res);
    }
};
const adminWithdraw = async (req, res) => {
    const { amount, accNo } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid transaction amount' });
    }
    try {
        const user = await Register.findOne({ accNo });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (amount > user.currentbalance) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const transaction = new Transaction({
            amount,
            type: 'withdraw',
            username: user.username,
            user_id: user._id,
        });
        user.currentbalance -= amount;
        await transaction.save();
        await user.save();
        res.status(201).json({ message: 'Withdrawal successful', transaction });
    } catch (error) {
        errorHandler(error, res);
    }
};
module.exports = {
    adminLogin,
    adminDeposit,
    adminWithdraw,
};