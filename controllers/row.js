'use strict';
const mongoose = require('mongoose');
const row = mongoose.model('Row');

class Row {
  get(req, res) {
    row.get().exec()
      .then( data => {
        res.send(data);
      })
      .catch(err => {
        console.log('error in GET rows', err);
      });
  }
  post(req, res) {
    const item = req.body.data;
    const data = {
      cardlist: item
    }
    row.post(data).then( (result) => {
      res.send(result);
    });
  }
  delete(req, res) {
    const id = req.params.id;
    row.delete(id).exec()
      .then( data => {
        res.send(id);
      })
      .catch(err => {
        console.log('error in DELETE rows', err);
      });
  }
}

module.exports = new Row;
