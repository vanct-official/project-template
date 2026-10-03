const healthService = require('../services/health.service');
const { sendSuccess } = require('../utils/response');

/**
 * Controller handling health check requests
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function checkHealth(req, res, next) {
  try {
    const healthData = healthService.getSystemHealth();
    return sendSuccess(res, 'System is healthy and operational', healthData);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  checkHealth
};
