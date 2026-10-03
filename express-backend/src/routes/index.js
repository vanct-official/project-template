const express = require('express');
const router = express.Router();

const healthRoute = require('./health.route');

// API Health Check Route
router.use('/health', healthRoute);

// Base route for quick API welcome / status
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Express Backend API',
    endpoints: {
      health: '/api/health'
    },
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
