const express = require('express');
const router = express.Router();
const { adminLogin, adminDeposit, adminWithdraw, adminGetTransactions } = require('../controllers/adminController');
router.post('/deposit', adminDeposit);
router.post('/withdraw', adminWithdraw);
router.get('/transactions/:accNo', adminGetTransactions);
module.exports = router;
