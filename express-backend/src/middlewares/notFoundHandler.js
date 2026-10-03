const { sendError } = require('../utils/response');

/**
 * Middleware handling 404 Not Found requests
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function notFoundHandler(req, res) {
  return sendError(
    res,
    `Route not found: ${req.method} ${req.originalUrl}`,
    404
  );
}

module.exports = notFoundHandler;
