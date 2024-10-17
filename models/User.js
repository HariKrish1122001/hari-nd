const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    accNo: { type: String, required: true, unique: true },
    currentbalance: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', userSchema);