const express = require('express');
const authRouter = require('./routers/auth.router');
const reportRouter = require('./routers/report.router');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
app.use(cors({
    origin: ['https://guid-1.onrender.com'],
    credentials: true,
}));
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/report', reportRouter);

module.exports = app;