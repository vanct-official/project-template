const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');

const config = require('./config/environment');
const openApiDocument = require('./config/openApi');
const routes = require('./routes');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Security HTTP headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(cors(config.cors));

// Gzip / deflate compression
app.use(compression());

// HTTP Request logging
app.use(morgan(config.isProduction ? 'combined' : 'dev'));

// Parse incoming JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!config.isProduction) {
    app.use('/api-docs', helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                'script-src': ["'self'", "'unsafe-inline'"],
                'style-src': ["'self'", "'unsafe-inline'"]
            }
        }
    }));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
    app.get('/api-docs.json', (req, res) => res.json(openApiDocument));
}

// Root welcome route
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get the service welcome message
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service status and useful endpoint links
 */
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Express Backend API Server is running',
        version: '1.0.0',
        documentation: config.isProduction ? '/api' : '/api-docs',
        health: '/api/health',
        timestamp: new Date().toISOString(),
        author: 'Chu Thế Văn (VanCt)'
    });
});

// Mount application API routes
app.use('/api', routes);

// 404 Not Found handler for undefined routes
app.use(notFoundHandler);

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;
