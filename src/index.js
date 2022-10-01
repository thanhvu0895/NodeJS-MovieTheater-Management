const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

app.use(express.json());
app.use(express.static("."));
app.listen(8080)

const rootRouter = require('./routers/index')
app.use("/api",rootRouter)

// swaggerRouter configuration

const swaggerOption = require('../swagger.json')

const swaggerDocs = swaggerJsDoc(swaggerOption);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));