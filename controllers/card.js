"use strict";
const mongoose = require('mongoose');
const card = mongoose.model('Card');
const todo = mongoose.model('Todo');

class Card {
  get(req, res, next) {
    const id = req.params.id;
    card.get(id).exec()
      .then(data => {
        res.json(data);
      })
      .catch(next);
  }
  post(req, res, next) {
    const item = req.body;
    card.post(item)
      .then(result => {
        res.json(result);
      })
      .catch(next);
  }
  delete(req, res, next) {
    const id = req.params.id;
    todo.deleteTodos(id).exec()
      .then(() => {
        card.delete(id).exec()
          .then(() => {
            res.json(id);
          })
          .catch(next);
      })
      .catch(next);
  }
  changeTitle(req, res, next) {
    const id = req.params.id;
    const title = req.body.title;
    card.changeTitle(id, title).exec()
     .then(() => {
       res.json(title);
     })
     .catch(next);
  }
}
module.exports = new Card;
