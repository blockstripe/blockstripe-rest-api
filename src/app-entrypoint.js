const app = require('express')();
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDocs = require('swagger-jsdoc');
const version = require('../package.json').version;

const swaggerSpec = swaggerJSDocs({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BlockStripe Rest API',
            version,
        },
    },
    apis: ['./src/**/*.js'],
});

const usersRoute = require('./routes/users.route');

app.use(cors());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/', usersRoute);

app.listen(3002, () => {
    console.log('App running on port:', 3002);
});
