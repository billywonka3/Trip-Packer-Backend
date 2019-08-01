const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const categorySchema = new Schema({
  title: String,
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;