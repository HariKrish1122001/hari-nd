// const Transaction = require('../models/Transaction');
// const User = require('../models/User');
// const errorHandler = (error, res) => {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
// };
// const validateTransaction = (req, res, next) => {
//     const { amount, accNo } = req.body;
//     if (!amount || amount <= 0) {
//         return res.status(400).json({ message: 'Amount must be greater than zero' });
//     }
//     if (!accNo) {
//         return res.status(400).json({ message: 'Account number is required' });
//     }
//     next();
// };
// const userMiddleware = async (req, res, next) => {
//     const { username, accNo } = req.body;
//     try {
//         const user = await User.findOne({ username, accNo });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         errorHandler(error, res);
//     }
// };
// const deposit = async (req, res) => {
//     const { amount } = req.body;
//     try {
//         const transaction = new Transaction({
//             amount,
//             type: 'deposit',
//             username: req.user.username,
//             user_id: req.user._id,
//         });
//         req.user.currentbalance += amount;
//         await transaction.save();
//         await req.user.save();
//         res.status(201).json({ message: 'Deposit successful', transaction });
//     } catch (error) {
//         errorHandler(error, res);
//     }
// };
// const withdraw = async (req, res) => {
//     const { amount } = req.body;
//     try {
//         if (amount > req.user.currentbalance) {
//             return res.status(400).json({ message: 'Insufficient funds' });
//         }
//         const transaction = new Transaction({
//             amount,
//             type: 'withdraw',
//             username: req.user.username,
//             user_id: req.user._id,
//         });
//         req.user.currentbalance -= amount;
//         await transaction.save();
//         await req.user.save();
//         res.status(201).json({ message: 'Withdrawal successful', transaction });
//     } catch (error) {
//         errorHandler(error, res);
//     }
// };
// const getTransactions = async (req, res) => {
//     const accNo = req.query['acc-no'];
//     if (!accNo) {
//         return res.status(400).json({ message: 'Account number is required' });
//     }
//     try {
//         const user = await User.findOne({ accNo });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const transactions = await Transaction.find({ user_id: user._id }).sort({ createdAt: -1 });
//         res.status(200).json({
//             accNo,
//             currentBalance: user.currentbalance,
//             transactions: transactions.map(({ createdAt, type, amount }) => ({
//                 dateTime: createdAt,
//                 type,
//                 amount,
//             })),
//         });
//     } catch (error) {
//         errorHandler(error, res);
//     }
// };
// module.exports = {
//     validateTransaction,
//     userMiddleware,
//     deposit,
//     withdraw,
//     getTransactions,
// };


const User = require('../models/User');
const Register = require('../models/Register');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};
const validateTransaction = (req, res, next) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than zero' });
    }
    next();
};
const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token provided, authorization denied' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await Register.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
const deposit = async (req, res) => {
    const { amount } = req.body;
    try {
        const transaction = new Transaction({
            amount,
            type: 'deposit',
            username: req.user.username,
            user_id: req.user._id,
        });
        req.user.currentbalance += amount;
        await transaction.save();
        await req.user.save();
        res.status(201).json({ message: 'Deposit successful', transaction });
    } catch (error) {
        errorHandler(error, res);
    }
};
const withdraw = async (req, res) => {
    const { amount } = req.body;
    try {
        if (amount > req.user.currentbalance) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        const transaction = new Transaction({
            amount,
            type: 'withdraw',
            username: req.user.username,
            user_id: req.user._id,
        });
        req.user.currentbalance -= amount;
        await transaction.save();
        await req.user.save();
        res.status(201).json({ message: 'Withdrawal successful', transaction });
    } catch (error) {
        errorHandler(error, res);
    }
};
const getTransactions = async (req, res) => {
    const transactions = await Transaction.find({ user_id: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
        currentBalance: req.user.currentbalance,
        transactions: transactions.map(({ createdAt, type, amount }) => ({
            dateTime: createdAt,
            type,
            amount,
        })),
    });
};
module.exports = {
    validateTransaction,
    authenticateUser,
    deposit,
    withdraw,
    getTransactions,
};