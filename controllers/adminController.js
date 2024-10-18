const Register = require('../models/Register');
const Transaction = require('../models/Transaction');
const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};
const adminDeposit = async (req, res) => {
    const { amount, accNo } = req.body;
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
    adminDeposit,
    adminWithdraw,
};