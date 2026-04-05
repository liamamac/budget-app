require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));

module.exports = app;