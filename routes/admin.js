const express = require('express');
const router = express.Router();
const { adminLogin, adminDeposit, adminWithdraw } = require('../controllers/adminController');
router.post('/login', adminLogin);
router.post('/deposit', adminDeposit);
router.post('/withdraw', adminWithdraw);
module.exports = router;