const { Admin } = require('../models/Admin');
const Register = require('../models/Register');
const Transaction = require('../models/Transaction');
const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};

const adminDeposit = async (req, res) => {
    const { amount, accNo } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid transaction amount' });
    }
    try {
        const user = await Register.findOne({ accNo });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.currentbalance += amount;
        const transaction = new Transaction({
            amount,
            type: 'deposit',
            username: user.username,
            user_id: user._id,
        });

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

        user.currentbalance -= amount;
        const transaction = new Transaction({
            amount,
            type: 'withdraw',
            username: user.username,
            user_id: user._id,
        });

        await transaction.save();
        await user.save();

        res.status(201).json({ message: 'Withdrawal successful', transaction });
    } catch (error) {
        errorHandler(error, res);
    }
};

const adminGetTransactions = async (req, res) => {
    const { accNo } = req.params;
    try {
        const user = await Register.findOne({ accNo });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const transactions = await Transaction.find({ user_id: user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            currentBalance: user.currentbalance,
            transactions: transactions.map(({ createdAt, type, amount }) => ({
                dateTime: createdAt,
                type,
                amount,
                accNo: user.accNo,
                user_id: user._id,
            })),
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = {
    adminDeposit,
    adminWithdraw,
    adminGetTransactions,
};
