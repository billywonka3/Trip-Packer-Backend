const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  myItems: {
    type: [{type: Schema.Types.ObjectId, ref: 'Items'}]
  },
  myToiletries: {
    type: [{type: Schema.Types.ObjectId, ref: 'Toiletries'}]
  },
  myElectronics: {
    type: [{type: Schema.Types.ObjectId, ref: 'Electronics'}]
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;