const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const electronicsSchema = new Schema({
  name: String,
  // weight: Number,
});

const Electronics = mongoose.model('Electronics', electronicsSchema);

module.exports = Electronics;