'use strict';
const mongoose = require('mongoose');
const card = mongoose.model('Card');
const todo = mongoose.model('Todo');

class Card {
  get(req, res, next) {
    const id = req.params.id;
    card.get(id).exec()
      .then(data => {
        res.send(data);
      })
      .catch(next);
  }
  post(req, res, next) {
    const item = req.body;
    card.post(item)
      .then(result => {
        res.send(result);
      })
      .catch(next);
  }
  delete(req, res, next) {
    const id = req.params.id;
    todo.deleteTodos(id).exec()
      .then(data => {
        card.delete(id).exec()
          .then(data => {
            res.send(id);
          })
          .catch(next);
      })
      .catch(next);
  }
  changeTitle(req, res, next) {
    const id = req.params.id;
    const title = req.body.title;
    card.changeTitle(id, title).exec()
     .then(data => {
       res.send(title);
     })
     .catch(next);
  }
}
module.exports = new Card;
