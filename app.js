var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('lodash');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var app = express();

mongoose.connect('mongodb://localhost/test');

var rowSchema = new Schema({
  cardlist: Array,
});

var Row = mongoose.model('Row', rowSchema);

var cardSchema = new Schema({
  cardlist_id: Schema.Types.ObjectId,
  title: String,
  todos: Array,
  class: String,
});

var Card = mongoose.model('Card', cardSchema);

var todoSchema = new Schema({
  card_id: Schema.Types.ObjectId,
  text: String,
  done: Boolean,
});

var Todo = mongoose.model('Todo', todoSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

/* logic of card lists */

/* get list of rows from cardlists array */

app.get('/rows', (req, res) => {
  Row.find().exec( (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});

/* add new row for cardlists array */

app.post('/rows', (req, res) => {
  const item = req.body.data;
  const data = {
    cardlist: item
  }
  Row.create(data).then( (result) => {
    res.send(result);
  });
});

/* delete row from cardlists array*/

app.delete('/rows/:id', (req, res) => {
  const id = req.params.id;
  Row.remove({_id: id}).exec( (err, data) => {
    if (err) {
      console.log('eroor', err);
    } else {
      res.send(id);
    }
  });
});

/* logic of card list */

/* get list of cards for every row from cards array */

app.get('/rows/:id', (req, res) => {
  const id = req.params.id;
  Card.find({cardlist_id: id}).exec( (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});

/* add new card in cards array */

app.post('/card', (req, res) => {
  const item = req.body;
  Card.create(item).then( (result) => {
    res.send(result);
  });
});

/* delete card from cards array */

app.delete('/cards/:id', (req, res) => {
  const id = req.params.id;
  Todo.remove({card_id: id}).exec((err, data) => {
    if (err) {
      console.log('error todo remove in card removing', err);
    } else {
      Card.remove({_id: id}).exec((err, data) => {
        if (err) {
          console.log('error in card remove', err);
        } else {
          res.send(id);
        }
      });
    }
  });
});

/* logic of card */

/* get list of todos for every card from todos array*/

app.get('/cards/:id', (req, res) => {
  const id = req.params.id;
  Todo.find({card_id: id}).exec( (err, docs) => {
    if (err) {
      console.log('error in todo find', err);
    } else {
      res.send(docs);
    }
  });
});

/* change title of card */

app.put('/cards/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  Card.findOneAndUpdate({_id: id}, {'title': title}).exec( (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(title);
    }
  });
});

/* delete todo from todos array */

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  Todo.remove({_id: id}).exec( (err, data) => {
    if (err) {
      console.log('eroor', err);
    } else {
      res.send(id);
    }
  });
});

/* add new todo in todos array */

app.post('/todo', (req, res) => {
  const item = req.body;
  Todo.create(item).then( (result) => {
    res.send(result);
  });
});

/* logic of todo */
/* change title of todo */

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  Todo.findOneAndUpdate({_id: id}, {'text': title}).exec( (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(title);
    }
  });
});

/* change status of todo */

app.put('/todos/status/:id', (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  Todo.findOneAndUpdate({_id: id}, {'done': status}).exec( (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(status);
    }
  });
});

app.listen(3001, () => {
  console.log('server on localhost:3001');
});
