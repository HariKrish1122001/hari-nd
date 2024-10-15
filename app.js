const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const connectDB = require('./config/db');
const transactionRouter = require('./routes/transaction');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', transactionRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});