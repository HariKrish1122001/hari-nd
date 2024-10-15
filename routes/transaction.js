const express = require('express');
const router = express.Router();
const {
    validateTransaction,
    userMiddleware,
    deposit,
    withdraw,
    getTransactions
} = require('../controllers/transactionController');
router.post('/deposit', [validateTransaction, userMiddleware], deposit);
router.post('/withdraw', [validateTransaction, userMiddleware], withdraw);
router.get('/', getTransactions);
module.exports = router;