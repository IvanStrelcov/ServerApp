'use strict';
const mongoose = require('mongoose');
const card = mongoose.model('Card');
const todo = mongoose.model('Todo');

class Card {
  get(req, res) {
    const id = req.params.id;
    card.get(id).exec()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('error in GET card request', err);
      });
  }
  post(req, res) {
    const item = req.body;
    card.post(item).then(result => {
      res.send(result);
    });
  }
  delete(req, res) {
    const id = req.params.id;
    todo.deleteTodos(id).exec()
      .then(data => {
        card.delete(id).exec()
          .then(data => {
            res.send(id);
          })
          .catch(err => {
            console.log('catch error in DELETE card request', err);
          });
      })
      .catch( err => {
        console.log('catch error in DELETE todos in card request', err);
      });
  }
  changeTitle(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    card.changeTitle(id, title).exec()
     .then(data => {
       res.send(title);
     })
     .catch(err => {
       console.log('catch error in PUT request change title of card', err);
     });
  }
}
module.exports = new Card;
