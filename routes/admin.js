const express = require('express');
const {
    adminDeposit,
    adminWithdraw,
} = require('../controllers/adminController');
const router = express.Router();
const { validateTransaction, authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');
router.post('/deposit', [authenticateUser, authenticateAdmin, validateTransaction], adminDeposit);
router.post('/withdraw', [authenticateUser, authenticateAdmin, validateTransaction], adminWithdraw);
module.exports = router;