'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.messageSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  editor_name: String,
  space: {
    type: Schema.Types.ObjectId,
    ref: 'Space'
  },
  message: String,
  created_from_ip: {type: String},
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports.messageSchema.index({
  space: 1,
  user: 1
});
