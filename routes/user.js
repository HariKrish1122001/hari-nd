const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
router.get('/', async (req, res) => {
    const accNo = req.query['acc-no'];
    if (!accNo) {
        return res.status(400).json({ message: 'Account number is required' });
    }
    try {
        const transactions = await Transaction.find({ accNo });
        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this account number' });
        }

        let currentBalance = transactions.reduce((balance, transaction) => {
            return transaction.type === 'deposit' ? balance + transaction.amount : balance - transaction.amount;
        }, 0);

        const userResponse = {
            accNo: accNo,
            name: transactions[0].username,
            currentBalance: currentBalance,
            transactions: transactions.map(transaction => ({
                dateTime: transaction.createdAt,
                type: transaction.type,
                amount: transaction.amount,
            })),
        };
        res.status(200).json(userResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
