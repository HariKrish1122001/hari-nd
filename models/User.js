const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    accNo: { type: String, required: true, unique: true },
    currentbalance: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     accNo: { type: String, required: true, unique: true },
//     currentbalance: { type: Number, required: true, default: 0 },
//     password: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
// });
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });
// module.exports = mongoose.model('User', userSchema);