// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// router.get('/id', async (req, res) => {
//     const accNo = req.query['acc-no'];
//     if (!accNo) {
//         return res.status(400).json({ message: 'Account number is required' });
//     }
//     try {
//         const user = await User.findOne({ accNo });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ id: user._id });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
// module.exports = router;


const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/userController');
router.get('/id', getUserById);
module.exports = router;