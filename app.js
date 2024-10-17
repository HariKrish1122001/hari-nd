const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const transactionRouter = require('./routes/transaction');
const authRouter = require('./routes/auth');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/v1', transactionRouter);
app.use('/api/auth', authRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});