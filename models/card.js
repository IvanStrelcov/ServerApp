const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  cardlist_id: Schema.Types.ObjectId,
  title: String,
  todos: Array,
  class: String,
});

cardSchema.statics.get = function (id) {
  return this.find({ cardlist_id: id });
};

cardSchema.statics.post = function (item) {
  return this.create(item);
};

cardSchema.statics.delete = function (id) {
  return this.remove({ _id: id });
};

cardSchema.statics.changeTitle = function (id, title) {
  return this.findOneAndUpdate({ _id: id }, { title: title });
};

mongoose.model('Card', cardSchema);
