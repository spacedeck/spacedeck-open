'use strict';

require('../models/db');
var config = require('config');
const redis = require('../helpers/redis');

// FIXME TODO object.toJSON()

var saveAction = (actionKey, object) => {
  if (object.constructor.modelName == "Space")
    return;

  let attr = {
    action: actionKey,
    space: object.space_id || object.space,
    user: object.user_id || object.user,
    editor_name: object.editor_name,
    object: object
  };

  /*let action = new Action(attr);
  action.save(function(err) {
    if (err)
      console.error("saved create action err:", err);
  });*/
};

module.exports = (req, res, next) => {
  res.header("Cache-Control", "no-cache");

  req['channelId'] = req.headers['x-spacedeck-channel'];
  req['spacePassword'] = req.headers['x-spacedeck-spacepassword'];
  req['spaceAuth'] = req.query['spaceAuth'] || req.headers['x-spacedeck-space-auth'];

  res['distributeCreate'] = function(model, object) {
    if (!object) return;
    redis.sendMessage("create", model, object, req.channelId);
    this.status(201).json(object);
    saveAction("create", object);
  };

  res['distributeUpdate'] = function(model, object) {
    if (!object) return;
    redis.sendMessage("update", model, object, req.channelId);
    this.status(200).json(object);
    saveAction("update", object);
  };

  res['distributeDelete'] = function(model, object) {
    if (!object) return;
    redis.sendMessage("delete", model, object, req.channelId);
    this.sendStatus(204);
    saveAction("delete", object);
  };

  next();
}
