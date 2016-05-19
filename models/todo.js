const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  card_id: Schema.Types.ObjectId,
  text: String,
  done: Boolean,
});

todoSchema.statics.get = function (id) {
  return this.find({ card_id: id });
};

todoSchema.statics.post = function (item) {
  return this.create(item);
};

todoSchema.statics.delete = function (id) {
  return this.remove({ _id: id });
};

todoSchema.statics.deleteTodos = function (id) {
  return this.remove({ card_id: id });
};

todoSchema.statics.changeTitle = function (id, title) {
  return this.findOneAndUpdate({ _id: id }, { text: title });
};

todoSchema.statics.changeStatus = function (id, status) {
  return this.findOneAndUpdate({ _id: id }, { done: status });
};

mongoose.model('Todo', todoSchema);
