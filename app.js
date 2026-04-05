require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/test', async (req, res) => {
  res.json({ message: 'Connected to backend' });
});

module.exports = app;