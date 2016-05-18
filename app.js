"use strict";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./shemas');

const rows = require('./routes/rows');
const cards = require('./routes/cards');
const todos = require('./routes/todos');

const app = express();

mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use('/rows', rows);
app.use('/cards', cards);
app.use('/todos', todos);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: err
  });
});

app.listen(3001, () => {
  console.log('server on localhost:3001');
});
