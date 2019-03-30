const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, unique: true },
  img: String,
  rating: Number,
  lastSync: Date,
  lowPrice: Number,
  maxPrice: Number
});

module.exports = mongoose.model('Product', productSchema);
