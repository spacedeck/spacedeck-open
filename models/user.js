'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.userSchema = mongoose.Schema({
  email: String,
  password_hash: String,
  nickname: String,
  account_type: {type: String, default: "email"},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  avatar_original_uri: String,
  avatar_thumb_uri: String,
  src: String,
  confirmation_token: String,
  confirmed_at: Date,
  password_reset_token: String,
  home_folder_id: Schema.Types.ObjectId,
  team : { type: Schema.Types.ObjectId, ref: 'Team' },
  preferences: {
    language: String,
    email_notifications: {type: Boolean, default: true},
    daily_digest_last_send: Date,
    daily_digest: {type: Boolean, default: true}
  },
  sessions: [
    {
      token: String,
      expires: Date,
      device: String,
      ip: String,
      created_at: Date
    }
  ],
  payment_info: String,
  payment_plan_key: {type: String, default: "free"},
  payment_customer_id: String,
  payment_subscription_id: String,
  payment_notification_state: Number
});

module.exports.userSchema.index({ 
  email: 1,
  "sessions.token": 1,
  team: 1,
  created_at: 1,
  home_folder_id: 1
});

module.exports.userSchema.statics.findBySessionToken = function (token, cb) {
  return this.findOne({ "sessions.token": token}, cb);
};
