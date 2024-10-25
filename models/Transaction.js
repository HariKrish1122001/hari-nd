

const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['deposit', 'withdraw'], required: true },
    username: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Register', required: true },
}, { timestamps: true });
module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);