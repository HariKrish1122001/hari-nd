const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

const errorHandler = (error, res) => {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};

router.post('/deposit', async (req, res) => {
    const { username, amount, accNo } = req.body;
    try {
        if (!username || !amount || !accNo) {
            return res.status(400).json({ message: 'Missing required fields: username, amount, accNo' });
        }
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }
        const transaction = new Transaction({ username, amount, accNo, type: 'deposit' });
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        errorHandler(error, res);
    }
});

router.post('/withdraw', async (req, res) => {
    const { username, amount, accNo } = req.body;
    try {
        if (!username || !amount || !accNo) {
            return res.status(400).json({ message: 'Missing required fields: username, amount, accNo' });
        }
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }

        const transactions = await Transaction.find({ accNo });
        let currentBalance = transactions.reduce((balance, transaction) => {
            return transaction.type === 'deposit' ? balance + transaction.amount : balance - transaction.amount;
        }, 0);

        if (amount > currentBalance) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const transaction = new Transaction({ username, amount, accNo, type: 'withdraw' });
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        errorHandler(error, res);
    }
});

module.exports = router;
