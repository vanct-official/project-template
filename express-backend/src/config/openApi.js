const path = require('node:path');
const swaggerJsdoc = require('swagger-jsdoc');

const config = require('./environment');
const toGlobPath = filePath => filePath.split(path.sep).join('/');

module.exports = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Express Backend API',
      version: '1.0.0',
      description: 'REST API for the fullstack project template.'
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Local development server'
      }
    ],
    tags: [
      { name: 'System', description: 'Service status and information' },
      { name: 'Health', description: 'Health check operations' }
    ]
  },
  apis: [
    toGlobPath(path.resolve(__dirname, '../app.js')),
    toGlobPath(path.resolve(__dirname, '../routes/*.js'))
  ]
});
