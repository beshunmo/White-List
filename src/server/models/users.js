const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: String,
  facebook: String,
  img: String

});

module.exports = mongoose.model('Users', userSchema);
