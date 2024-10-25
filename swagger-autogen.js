const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/transaction.js', './routes/auth.js', './routes/admin.js'];
const doc = {
    info: {
        title: 'Banking API',
        description: 'Banking Application API'
    },
    host: 'localhost:4000',
    schemes: ['http']
};
swaggerAutogen(outputFile, endpointsFiles, doc);