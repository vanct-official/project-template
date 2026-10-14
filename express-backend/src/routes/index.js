const express = require('express');
const router = express.Router();

const healthRoute = require('./health.route');

// API Health Check Route
router.use('/health', healthRoute);

// Base route for quick API welcome / status
/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get the API welcome message
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API status and available endpoint links
 */
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
