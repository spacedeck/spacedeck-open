'use strict';

// FIXME port this last model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.actionSchema = mongoose.Schema({
  space: {
    type: Schema.Types.ObjectId,
    ref: 'Space'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  editor_name: String,
  action: String,
  object: Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports.actionSchema.index({
  space: 1,
  created_at: 1
});

