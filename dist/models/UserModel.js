'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: false,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  items: [{
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    originalTitle: {
      type: String,
      required: true
    },
    overview: {
      type: String,
      required: true
    },
    releaseDate: {
      type: String,
      required: true
    },
    voteAverage: {
      type: Number,
      required: true
    },
    voteCount: {
      type: Number,
      required: true
    },
    posterPath: {
      type: String,
      required: true
    }
  }]
});

module.exports = mongoose.model('User', userSchema);