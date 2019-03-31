'use strict';

const mongoose = require('mongoose');

const guestsSchema = mongoose.Schema({
  user_id: String,
  title: String,
  img: String

});

module.exports = mongoose.model('Guests', guestsSchema);