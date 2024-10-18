// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const registerSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     accNo: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });
// registerSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });
// registerSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };
// module.exports = mongoose.model('Register', registerSchema);

// models/Register.js


const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    accNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // currentbalance: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.models.Register || mongoose.model('Register', registerSchema);