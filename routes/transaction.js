const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};
const validateTransaction = (req, res, next) => {
    const { amount, accNo } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than zero' });
    }
    if (!accNo) {
        return res.status(400).json({ message: 'Account number is required' });
    }
    next();
};
const userMiddleware = async (req, res, next) => {
    const { username, accNo } = req.body;
    try {
        const user = await User.findOne({ username, accNo });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        errorHandler(error, res);
    }
};
router.post('/deposit', [validateTransaction, userMiddleware], async (req, res) => {
    const { amount, accNo } = req.body;
    try {
        const transaction = new Transaction({ accNo, amount, type: 'deposit', username: req.user.username });
        req.user.currentbalance += amount;
        await transaction.save();
        await req.user.save();

        res.status(201).json({ message: transaction });
    } catch (error) {
        errorHandler(error, res);
    }
});
router.post('/withdraw', [validateTransaction, userMiddleware], async (req, res) => {
    const { amount, accNo } = req.body;
    try {
        if (amount > req.user.currentbalance) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        const transaction = new Transaction({ accNo, amount, type: 'withdraw', username: req.user.username });
        req.user.currentbalance -= amount;
        await transaction.save();
        await req.user.save();
        res.status(201).json({ message: transaction });
    } catch (error) {
        errorHandler(error, res);
    }
});
router.get('/', async (req, res) => {
    const accNo = req.query['acc-no'];
    if (!accNo) {
        return res.status(400).json({ message: 'Account number is required' });
    }
    try {
        const user = await User.findOne({ accNo });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const transactions = await Transaction.find({ accNo });
        res.status(200).json({
            accNo,
            currentBalance: user.currentbalance,
            transactions: transactions.map(({ createdAt, type, amount }) => ({ dateTime: createdAt, type, amount })),
        });
    } catch (error) {
        errorHandler(error, res);
    }
});
module.exports = router;
