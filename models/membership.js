'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.membershipSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  space: {
    type: Schema.Types.ObjectId,
    ref: 'Space'
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  role: {
    type: String,
    default: "viewer"
  },
  state: {
    type: String,
    default: "active"
  },
  email_invited: String,
  code: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports.membershipSchema.index({
  user: 1,
  space: 1,
  team: 1,
  code: 1
});

