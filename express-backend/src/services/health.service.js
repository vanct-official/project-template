/**
 * Health check service providing system status details
 */
function getSystemHealth() {
  const uptimeSeconds = process.uptime();
  const memoryUsage = process.memoryUsage();

  return {
    status: 'healthy',
    uptime: `${Math.floor(uptimeSeconds)} seconds`,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
    },
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development'
  };
}

module.exports = {
  getSystemHealth
};
