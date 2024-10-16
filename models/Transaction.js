    // const mongoose = require('mongoose');
    // const transactionSchema = new mongoose.Schema({
    //     // username: { type: String, required: true, ref: 'User' },
    //     // accNo: { type: String, required: true, ref: 'User' },
    //     amount: { type: Number, required: true },
    //     type: { type: String, enum: ['deposit', 'withdraw'], required: true },
    //     createdAt: { type: Date, default: Date.now },
    //     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // });
    // module.exports = mongoose.model('Transaction', transactionSchema);


// models/Transaction.js



const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['deposit', 'withdraw'], required: true },
    username: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Register', required: true },
}, { timestamps: true });
module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);