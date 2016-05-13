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

/* logic of card lists */

/* get list of rows from cardlists array */

app.get('/rows', function (req, res) {
  res.send(cardlists);
});

/* add new row for cardlists array */

app.post('/rows', function (req, res) {
  const item = req.body.data;
  const data = {
    id: _.uniqueId('row_'),
    cardlist: item
  }
  cardlists.push(data);
  res.send(data);
});

/* delete row from cardlists array*/

app.delete('/rows/:id', function (req, res) {
  const id = req.params.id;
  _.pullAllBy(cardlists, [{ 'id': id }], 'id');
  res.send(id);
});

/* logic of card list */

/* get list of cards for every row from cards array */

app.get('/cardlist/:id', function (req, res) {
  const id = req.params.id;
  const result = _.filter(cards, {cardlist_id: id});
  res.send(result);
});

/* add new card in cards array */

app.post('/card', function (req, res) {
  const item = req.body;
  item.id = _.uniqueId('card_');
  cards.push(item);
  res.send(item);
});

/* delete card from cards array */

app.delete('/cards/:id', function (req, res) {
  const id = req.params.id;
  _.pullAllBy(cards, [{ 'id': id }], 'id');
  res.send(id);
});

/* logic of card */

/* get list of todos for every card from todos array*/

app.get('/cards/:id', function (req, res) {
  const id = req.params.id;
  const result = _.filter(todos, {card_id: id});
  res.send(result);
});

/* add new todo in todos array */

app.post('/todo', function (req, res) {
  const item = req.body;
  item.id = _.uniqueId('todo_');
  todos.push(item);
  res.send(item);
});

/* delete todo from todos array */

app.delete('/todos/:id', function (req, res) {
  const id = req.params.id;
  _.pullAllBy(todos, [{ 'id': id }], 'id');
  res.send(id);
});

/* change title of card */

app.put('/cards/:id', function (req, res) {
  const id = req.params.id;
  const title = req.body.title;
  _.find(cards, { 'id': id }).title = title;
  res.send(title);
});

/* logic of todo */
/* change title of todo */

app.put('/todos/:id', function (req, res) {
  const id = req.params.id;
  const title = req.body.title;
  _.find(todos, { 'id': id }).title = title;
  res.send(title);
});

/* change status of todo */

app.put('/todos/status/:id', function (req, res) {
  const id = req.params.id;
  const status = req.body.status;
  _.find(todos, { 'id': id }).done = status;
  res.send(status);
});

app.listen(3001, function(){
  console.log('server on localhost:3001');
});
