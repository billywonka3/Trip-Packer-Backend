const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const toiletriesSchema = new Schema({
  name: String,
  // weight: Number,
});

const Toiletries = mongoose.model('Toiletries', toiletriesSchema);

module.exports = Toiletries;