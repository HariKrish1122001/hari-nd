const express = require('express');
const logger = require('morgan');
const authRoutes = require('./routes/auth');
const licenseRoutes = require('./routes/license');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);
app.use('/api/license', licenseRoutes);
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});