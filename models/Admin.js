const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
const Admin = mongoose.model('Admin', adminSchema);
const createDefaultAdmin = async () => {
    const defaultAdmin = {
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: process.env.DEFAULT_ADMIN_PASSWORD,
    };
    const existingAdmin = await Admin.findOne({ email: defaultAdmin.email });
    if (!existingAdmin) {
        const admin = new Admin(defaultAdmin);
        await admin.save();
        console.log('Default admin created:', defaultAdmin);
    } else {
        console.log('Default admin already exists.');
    }
};
module.exports = { Admin, createDefaultAdmin };