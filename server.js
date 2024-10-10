const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Transaction = require('./transaction');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/transactionDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const errorHandler = (error, res) => {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};
app.post('/api/transact/deposit', async (req, res) => {
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
app.post('/api/transact/withdraw', async (req, res) => {
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
            return res.status(404).json({ message: ' account number this not found ' });
        }
        const transaction = new Transaction({ username, amount, accNo, type: 'withdraw' });
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        errorHandler(error, res);
    }
});
app.get('/api/users', async (req, res) => {
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
        errorHandler(error, res);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
