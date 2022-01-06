const express = require('express');
const morgan = require('morgan');
const app = express();

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = require('./api/users/index');
app.use('/api/users', users);

module.exports = app;
