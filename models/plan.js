'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Plan = mongoose.model('Plan', {
  key: String,
  description: String,
  limit_folders: {
    type: Number,
    default: 200
  },
  limit_spaces: {
    type: Number,
    default: 500
  },
  limit_storage_bytes: {
    type: Number,
    default: 10737418240
  },
  plan_type: {
    type: String,
    default: "org"
  },
  price: Number,
  public: Boolean,
  recurring: {
    type: String,
    default: "month"
  },
  title: String,
  trial_days: Number,
  voucher_code: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

exports.planModel = Plan;