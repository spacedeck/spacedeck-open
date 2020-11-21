'use strict';

require('../models/db');
var config = require('config');
const redis = require('../helpers/redis');

module.exports = (req, res, next) => {
  res.header("Cache-Control", "no-cache");

  req['channelId'] = req.headers['x-spacedeck-channel'];
  req['spacePassword'] = req.headers['x-spacedeck-spacepassword'];
  req['spaceAuth'] = req.query['spaceAuth'] || req.headers['x-spacedeck-space-auth'];

  res['distributeCreate'] = function(model, object) {
    if (!object) return;
    redis.sendMessage("create", model, object, req.channelId);
    this.status(201).json(object);
  };

  res['distributeUpdate'] = function(model, object, sendToSelf) {
    if (!object) return;
    if (sendToSelf) {
      // send this update to the initiating user, for example when
      // a conversion task has finished
      redis.sendMessage("update-self", model, object, req.channelId);
    } else {
      redis.sendMessage("update", model, object, req.channelId);
    }
    this.status(200).json(object);
  };

  res['distributeDelete'] = function(model, object) {
    if (!object) return;
    redis.sendMessage("delete", model, object, req.channelId);
    this.sendStatus(204);
  };

  next();
}
