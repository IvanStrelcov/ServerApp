"use strict";
const mongoose = require('mongoose');
const row = mongoose.model('Row');

class Row {
  get(req, res, next) {
    row.get().exec()
      .then((data) => {
        res.json(data);
      })
      .catch(next);
  }
  post(req, res, next) {
    const item = req.body.data;
    const data = {
      cardlist: item
    };
    row.post(data)
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }
  delete(req, res, next) {
    const id = req.params.id;
    row.delete(id).exec()
      .then(() => {
        res.json(id);
      })
      .catch(next);
  }
}

module.exports = new Row;
