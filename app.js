const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec, swaggerUIOptions } = require('./config/swagger');
const basicAuth = require('./middleware/basicAuth');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger documentation
app.use('/api-docs', basicAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUIOptions));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = app;