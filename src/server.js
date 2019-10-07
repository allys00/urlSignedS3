const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const errorHandler = require('./helpers/errorHandler');
const { sign } = require('./lambdas/signedUrl');

const server = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

server.use(cors());
server.use(express.urlencoded({ extended: true, strict: false }));
server.use(express.json());

server.post('/', sign);

server.use(errorHandler.notFound);
server.use(errorHandler.internalServerError);


server.listen(3001);
// module.exports = server;