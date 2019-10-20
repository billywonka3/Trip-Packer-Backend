const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  myClothing: {
    type: [{type: Schema.Types.ObjectId, ref: 'Clothing'}]
  },
  myToiletries: {
    type: [{type: Schema.Types.ObjectId, ref: 'Toiletries'}]
  },
  myElectronics: {
    type: [{type: Schema.Types.ObjectId, ref: 'Electronics'}]
  },
  mySpecials: {
    type: [{type: Schema.Types.ObjectId, ref: 'Specials'}]
  },
  myHousehold: {
    type: [{type: Schema.Types.ObjectId, ref: 'Household'}]
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;