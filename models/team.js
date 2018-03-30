'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.teamSchema = mongoose.Schema({
  name: String,
  subdomain: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  invitation_codes: [String],
  avatar_thumb_uri: String,
  avatar_uri: String,
  payment_type: {
    type: String,
    default: "auto"
  },
  payment_plan_key: String,
  payment_subscription_id: String,
  blocked_at: {
    type: Date
  },
  upgraded_at: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports.teamSchema.index({
  creator: 1
});

module.exports.teamSchema.statics.getTeamForHost = (host, cb) => {

  if (host != "127.0.0.1:9666") { //phantomjs check
    let subDomainParts = host.split('.');

    if (subDomainParts.length > 2) {
      const subdomain = subDomainParts[0];

      if (subdomain != "www") {
        Team.findOne({
          subdomain: subdomain
        }).exec((err, team) => {
          cb(err, team, subdomain)
        });
      } else {
        cb(null, null)
      }

    } else {
      cb(null, null);
    }
  } else {
    cb(null, null);
  }
}
