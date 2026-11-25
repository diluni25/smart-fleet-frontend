const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const allocationRoutes = require('./routes/allocationRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) =>
  res.json({ success: true, message: 'LOGIROUTE Backend is running' })
);
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/allocations', allocationRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
