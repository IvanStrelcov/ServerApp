'use strict';
const mongoose = require('mongoose');
const todo = mongoose.model('Todo');

class Todo {
  get(req, res, next) {
    const id = req.params.id;
    todo.get(id).exec()
      .then(data => {
        res.send(data);
      })
      .catch(next);
  }
  post(req, res, next) {
    const item = req.body;
    todo.post(item)
      .then( result => {
        res.send(result);
      })
      .catch(next);
  }
  delete(req, res, next) {
    const id = req.params.id;
    todo.delete(id).exec()
      .then(data => {
        res.send(id);
      })
      .catch(next);
  }
  changeTitle(req, res, next) {
    const id = req.params.id;
    const title = req.body.title;
    todo.changeTitle(id, title).exec()
      .then( data => {
        res.send(title);
      })
      .catch(next);
  }
  changeStatus(req, res, next) {
    const id = req.params.id;
    const status = req.body.status;
    todo.changeStatus(id, status).exec()
      .then( data => {
        res.send(status);
      })
      .catch(next);
  }
}
module.exports = new Todo;
