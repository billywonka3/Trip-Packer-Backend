const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const specialsSchema = new Schema({
  category: String,
  name: String,
  // weight: Number,
});

const Specials = mongoose.model('Specials', specialsSchema);

module.exports = Specials;