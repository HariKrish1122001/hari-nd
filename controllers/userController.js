// const User = require('../models/User');
// const errorHandler = (error, res) => {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
// };
// const getUserById = async (req, res) => {
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
//         errorHandler(error, res);
//     }
// };
// module.exports = {
//     getUserById,
// };


const User = require('../models/User');
const Register = require('../models/Register');
const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
};
const getUserById = async (req, res) => {
    const accNo = req.query['acc-no'];
    if (!accNo) return res.status(400).json({ message: 'Account number is required' });
    try {
        const user = await Register.findOne({ accNo });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ id: user._id });
    } catch (error) {
        errorHandler(error, res);
    }
};
module.exports = { getUserById };