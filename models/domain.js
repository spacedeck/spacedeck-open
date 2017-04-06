'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.domainSchema = mongoose.Schema({
  domain: String,
  edu: Boolean,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports.domainSchema.index({
  domain: 1
});
