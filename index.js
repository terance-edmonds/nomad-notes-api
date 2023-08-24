const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const database = require('./database');
const config = require('./config');
const routes = require('./routes');

const app = express();

// connect to mongoDB
database.init();

// express in json format
app.use(express.json());

// add compression
app.use(compression());

// cors
app.use(
    cors({
        credentials: true
    })
);

// cookie parser
app.use(cookieParser());

// add a prefix for routes
app.use('/api', routes);

// listen to server at given port
app.listen(config.port, () => console.info('server listening at port:', config.port));
