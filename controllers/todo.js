'use strict';
const mongoose = require('mongoose');
const todo = mongoose.model('Todo');

class Todo {
  get(req, res) {
    const id = req.params.id;
    todo.get(id).exec()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log( 'error in GET todos request', err);
      });
  }
  post(req, res) {
    const item = req.body;
    todo.post(item).then( result => {
      res.send(result);
    });
  }
  delete(req, res) {
    const id = req.params.id;
    todo.delete(id).exec()
      .then(data => {
        res.send(id);
      })
      .catch(err => {
        console.log('catch error in DELETE todo request', err);
      });
  }
  changeTitle(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    todo.changeTitle(id, title).exec()
      .then( data => {
        res.send(title);
      })
      .catch( error => {
        console.log('catch error in PUT request changeTitle', err);
      });
  }
  changeStatus(req, res) {
    const id = req.params.id;
    const status = req.body.status;
    todo.changeStatus(id, status).exec()
      .then( data => {
        res.send(status);
      })
      .catch( error => {
        console.log('catch error in PUT request changeStatus', err);
      });
  }
}
module.exports = new Todo;
