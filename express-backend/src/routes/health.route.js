const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');

// GET /api/health
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check application and system health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Health status, runtime, and memory metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: System is healthy and operational
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: healthy
 *                     uptime:
 *                       type: string
 *                       example: 120 seconds
 *                     memory:
 *                       type: object
 *                       properties:
 *                         rss:
 *                           type: string
 *                           example: 64 MB
 *                         heapTotal:
 *                           type: string
 *                           example: 12 MB
 *                         heapUsed:
 *                           type: string
 *                           example: 8 MB
 *                     nodeVersion:
 *                       type: string
 *                       example: v20.0.0
 *                     environment:
 *                       type: string
 *                       example: development
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/', healthController.checkHealth);

module.exports = router;
