const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
  title: String,
  description: String,
  clothing: [{type: Schema.Types.ObjectId, ref: 'Clothing'}],
  toiletries: [{type: Schema.Types.ObjectId, ref: 'Toiletries'}],
  electronics: [{type: Schema.Types.ObjectId, ref: 'Electronics'}],
  specials: [{type: Schema.Types.ObjectId, ref: 'Specials'}],
  household: [{type: Schema.Types.ObjectId, ref: 'Household'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;