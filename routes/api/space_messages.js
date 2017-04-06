"use strict";
var config = require('config');
require('../../models/schema');

var redis = require('../../helpers/redis');
var mailer = require('../../helpers/mailer');
var uploader = require('../../helpers/uploader');
var space_render = require('../../helpers/space-render');
var phantom = require('../../helpers/phantom');

var async = require('async');
var fs = require('fs');
var _ = require("underscore");
var mongoose = require("mongoose");
var archiver = require('archiver');
var request = require('request');
var url = require("url");
var path = require("path");
var crypto = require('crypto');
var qr = require('qr-image');
var glob = require('glob');
var gm = require('gm');

var express = require('express');
var router = express.Router({mergeParams: true});

// JSON MAPPINGS

var userMapping = {
  _id: 1,
  nickname: 1,
  email: 1,
  avatar_thumb_uri: 1
};

var spaceMapping = {
  _id: 1,
  name: 1,
  thumbnail_url: 1
};

var roleMapping = {
  "none": 0,
  "viewer": 1,
  "editor": 2,
  "admin": 3
}

// MESSAGES

router.get('/', function(req, res, next) {
  Message.find({
    space: req.space._id
  }).populate('user', userMapping).exec(function(err, messages) {
    res.status(200).json(messages);
  });
});

router.post('/', function(req, res, next) {
  var attrs = req.body;
  attrs.space = req.space;

  if (req.user) {
    attrs.user = req.user;
  } else {
    attrs.user = null;
  }

  var msg = new Message(attrs);
  msg.save(function(err) {
    if (err) res.status(400).json(erra);
    else {
      if (msg.message.length <= 1) return;

      Membership
        .find({
          space: req.space,
          user: {
            "$exists": true
          }
        })
        .populate('user')
        .exec(function(err, memberships) {
          var users = memberships.map(function(m) {
            return m.user;
          });
          users.forEach((user) => {
            if (user.preferences.email_notifications) {
              redis.isOnlineInSpace(user, req.space, function(err, online) {
                if (!online) {
                  var nickname = msg.editor_name;
                  if (req.user) {
                    nickname = req.user.nickname;
                  }
                  mailer.sendMail(
                    user.email,
                    req.i18n.__("space_message_subject", req.space.name),
                    req.i18n.__("space_message_body", nickname, req.space.name), {
                      message: msg.message,
                      action: {
                        link: config.endpoint + "/spaces/" + req.space._id.toString(),
                        name: req.i18n.__("open")
                      }
                    });
                } else {
                  console.log("not sending message to user: is online.");
                }
              });
            } else {
              console.log("not sending message to user: is disabled notifications.");
            }
          });
        });

      res.distributeCreate("Message", msg);
    }
  });
});

router.delete('/:message_id', function(req, res, next) {
  Message.findOne({
    "_id": req.params.message_id
  }, function(err, msg) {
    if (!msg) {
      res.sendStatus(404);
    } else {
      msg.remove(function(err) {
        if (err) res.status(400).json(err);
        else {
          if (msg) {
            res.distributeDelete("Message", msg);
          } else {
            res.sendStatus(404);
          }
        }
      });
    }
  });
});

module.exports = router;
