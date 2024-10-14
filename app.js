const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const transactionRouter = require('./routes/transaction');
const userRouter = require('./routes/user');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
app.use(bodyParser.json());
app.use('/api/v1', transactionRouter);
app.use('/api/user', userRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});