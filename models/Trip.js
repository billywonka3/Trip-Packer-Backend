const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
  title: String,
  description: String,
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  toiletries: [{type: Schema.Types.ObjectId, ref: 'Toiletries'}],
  electronics: [{type: Schema.Types.ObjectId, ref: 'Electronics'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;