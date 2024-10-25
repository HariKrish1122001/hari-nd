// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const connectDB = require('./config/db');
// const transactionRouter = require('./routes/transaction');
// const authRouter = require('./routes/auth');
// const adminRouter = require('./routes/admin');
// const { createDefaultAdmin } = require('./models/Admin'); 
// require('dotenv').config();
// const app = express();
// const PORT = process.env.PORT || 4000;
// connectDB();
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use('/api/v1', transactionRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/admin', adminRouter);
// app.listen(PORT, async () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     await createDefaultAdmin();
// });


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const connectDB = require('./config/db');
const transactionRouter = require('./routes/transaction');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const { createDefaultAdmin } = require('./models/Admin'); 
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/v1', transactionRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await createDefaultAdmin();
});
