const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const config = require('./config/environment');
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

// Root welcome route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Express Backend API Server is running',
        version: '1.0.0',
        documentation: '/api',
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
