const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemSchema = new Schema({
  category: String,
  name: String,
  weight: Number,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;