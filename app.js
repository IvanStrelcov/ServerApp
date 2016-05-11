var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

var cardlists = [];
var cards = [];
var todos = [];

// logic of card list

app.get('/', function (req, res) {
  res.send(cardlists);
});

app.post('/rows', function (req, res) {
  const item = req.body.data;
  const data = {
    id: _.uniqueId(),
    cardlist: item
  }
  cardlists.push(data);
  res.send(data);
});

app.delete('/rows/:id', function (req, res) {
  const id = req.params.id;
  _.pullAllBy(cardlists, [{ 'id': id }], 'id');
  res.send(id);
});

app.listen(3001);
