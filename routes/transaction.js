// const express = require('express');
// const router = express.Router();
// const {
//     validateTransaction,
//     userMiddleware,
//     deposit,
//     withdraw,
//     getTransactions
// } = require('../controllers/transactionController');
// router.post('/deposit', [validateTransaction, userMiddleware], deposit);
// router.post('/withdraw', [validateTransaction, userMiddleware], withdraw);
// router.get('/', getTransactions);
// module.exports = router;
const express = require('express');
const {
    validateTransaction,
    authenticateUser,
    deposit,
    withdraw,
    getTransactions,
} = require('../controllers/transactionController');
const router = express.Router();
router.post('/deposit', [validateTransaction, authenticateUser], deposit);
router.post('/withdraw', [validateTransaction, authenticateUser], withdraw);
router.get('/', [authenticateUser], getTransactions);
module.exports = router;