const app = require('./app');
const config = require('./config/environment');

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`========== EXPRESS BACKEND SERVER =============`);
  console.log(`- Express Backend Server is running!`);
  console.log(`- URL: http://localhost:${PORT}`);
  console.log(`- Environment: ${config.nodeEnv}`);
  console.log(`========== EXPRESS BACKEND SERVER =============`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down gracefully...', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down immediately...', err);
  process.exit(1);
});

// Graceful shutdown on termination signals
const shutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Closing HTTP server gracefully...`);
  server.close(() => {
    console.log('✅ HTTP server closed. Process exiting.');
    process.exit(0);
  });

  // Force close after 10s if hanging
  setTimeout(() => {
    console.error('⚠️ Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = server;
