const express = require('express');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');



const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);
app.use(errorHandler);


module.exports = app;