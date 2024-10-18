const authenticateUser = (req, res, next) => {
    console.log('User authenticated');
    next();
};
const authenticateAdmin = (req, res, next) => {
    console.log('Admin authenticated');
    next();
};
const validateTransaction = (req, res, next) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid transaction amount' });
    }
    next();
};
module.exports = {
    authenticateUser,
    authenticateAdmin,
    validateTransaction,
};