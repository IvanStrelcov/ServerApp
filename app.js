var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

var cardlists = [];

app.get('/', function (req, res) {
  res.send(cardlists);
});

app.post('/rows', function (req, res) {
  const item = req.body.data;
  cardlists.push(item);
  res.send(item);
});

app.delete('/rows/:id', function (req, res) {
  const item = req.params.id;
  cardlists.splice(item, 1);
  res.send(200);
});

app.listen(3001);
