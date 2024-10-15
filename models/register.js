const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const registerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    accNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
registerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
registerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('Register', registerSchema);