"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rowSchema = new Schema({
  cardlist: Array,
});

rowSchema.statics.get = function () {
  return this.find();
};

rowSchema.statics.post = function (data) {
  return this.create(data);
};

rowSchema.statics.delete = function (id) { 
  return this.remove({ _id: id });
};

mongoose.model('Row', rowSchema);
