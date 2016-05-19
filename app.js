const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

require('./lib/mongo');

const rows = require('./routes/rows');
const cards = require('./routes/cards');
const todos = require('./routes/todos');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use('/rows', rows);
app.use('/cards', cards);
app.use('/todos', todos);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: err
  });
});

app.listen(config.app.port, err => {
  if (err) {
    console.log(err);
  }
  console.log('Server is started on port: ' + config.app.port);
});
