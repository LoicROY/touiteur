const express = require('express');
const cookieParser = require('cookie-parser');
const { resolve } = require('path');
const router = require('./router');

const app = express();

// Configuration
app.set('views', resolve('views'));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(resolve('public')));
app.use('/', router);

module.exports = app;
