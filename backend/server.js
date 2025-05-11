require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const exp = require('constants');

//middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URI || '*',
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

app.use(express.json());
connectDB();

app.use('/api/v1/auth',authRoutes);

app.use('/api/v1/income',incomeRoutes);

app.use('/api/v1/expense',expenseRoutes);

app.use('/api/v1/dashboard',dashboardRoutes)

//serve uploads folder
app.use('/uploads',express.static(path.join(__dirname, "uploads")));

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})