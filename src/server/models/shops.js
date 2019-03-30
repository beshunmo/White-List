const mongoose = require('mongoose');

const shopsSchema = mongoose.Schema({
  name: String,
  price: Number,
  presence: Number,
  lastUpdate: Date,
  product_id: String,
  link: String

});

module.exports = mongoose.model('Shops', shopsSchema);
