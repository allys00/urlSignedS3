const serverless = require('serverless-http');
const epsagon = require('epsagon');

const server = require('./server');

epsagon.init({
    token: '[Token]',
    appName: 'express-lambda-blog',
    metadataOnly: false // Optional, send more trace data
});

const handler = serverless(server);

module.exports.server = epsagon.lambdaWrapper(
    async (event, context) => await handler(event, context)
);

