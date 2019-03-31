'use strict';

const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user_id: String,
  cart: Array

});

module.exports = mongoose.model('Carts', cartSchema);