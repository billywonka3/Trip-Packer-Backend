const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const clothingSchema = new Schema({
  category: String,
  name: String,
  // weight: Number,
});

const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = Clothing;