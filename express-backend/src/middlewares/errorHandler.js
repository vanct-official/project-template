const config = require('../config/environment');

/**
 * Global Error Handler Middleware
 * @param {any} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  // Include validation errors if available
  if (err.errors) {
    response.errors = err.errors;
  }

  // Include stack trace only in non-production environments
  if (!config.isProduction && err.stack) {
    response.stack = err.stack;
  }

  // Log error to console in development
  if (!config.isProduction) {
    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);
  }

  return res.status(statusCode).json(response);
}

module.exports = errorHandler;
