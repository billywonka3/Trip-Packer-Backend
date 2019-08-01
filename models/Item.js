const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemSchema = new Schema({
  subcategory: String,
  name: String,
  weight: Number,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;