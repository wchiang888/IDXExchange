require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db/pool');
const propertiesRouter = require('./routes/properties');
const requestLogger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/properties', propertiesRouter);

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'unreachable' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});