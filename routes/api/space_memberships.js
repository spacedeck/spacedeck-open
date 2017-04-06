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

router.get('/', function(req, res, next) {
  Membership
    .find({
      space: req.space._id
    })
    .populate("user")
    .exec(function(err, memberships) {
      res.status(200).json(memberships);
    });
});

router.post('/', function(req, res, next) {
  if (req.spaceRole == "admin") {
    var attrs = req.body;
    attrs['space'] = req.space._id;
    attrs['state'] = "pending";
    var membership = new Membership(attrs);
    var msg = attrs.personal_message;

    if (membership.email_invited != req.user.email) {
      User.findOne({
        "email": membership.email_invited
      }, function(err, user) {

        if (user) {
          membership.user = user;
          membership.state = "active";
        } else {
          membership.code = crypto.randomBytes(64).toString('hex').substring(0, 12);
        }

        membership.save(function(err) {
          if (err) res.sendStatus(400);
          else {
            var accept_link = config.endpoint + "/accept/" + membership._id + "?code=" + membership.code;

            if (user) {
              accept_link = config.endpoint + "/" + req.space.space_type + "s/" + req.space._id;
            }

            var openText = req.i18n.__("space_invite_membership_action");
            if (user) {
              req.i18n.__("open");
            }

            const name = req.user.nickname || req.user.email
            const subject = (req.space.space_type == "space") ? req.i18n.__("space_invite_membership_subject", name, req.space.name) : req.i18n.__("folder_invite_membership_subject", req.user.nickname, req.space.name)
            const body = (req.space.space_type == "space") ? req.i18n.__("space_invite_membership_body", name, req.space.name) : req.i18n.__("folder_invite_membership_body", req.user.nickname, req.space.name)

            mailer.sendMail(
              membership.email_invited, subject, body, {
                messsage: msg,
                action: {
                  link: accept_link,
                  name: openText
                }
              });

            res.status(201).json(membership);
          }
        });

      });

    } else {
      res.status(400).json({
        "error": "user already in space"
      });
    }

  } else {
    res.status(403).json({
      "error": "not_permitted"
    });
  }
});

router.put('/:membership_id', function(req, res, next) {
  if (req.user) {
    if (req.spaceRole == "admin") {
      Membership.findOne({
        _id: req.params.membership_id
      }, function(err, mem) {
        if (err) res.sendStatus(400);
        else {
          if (mem) {
            var attrs = req.body;
            mem.role = attrs.role;
            mem.save(function(err) {
              if (err) res.sendStatus(400);
              else {
                res.status(201).json(mem);
              }
            });
          }
        }
      });
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
});

router.delete('/:membership_id', function(req, res, next) {
  if (req.user) {
    Membership.findOne({
      _id: req.params.membership_id
    }, function(err, mem) {
      if (err) res.sendStatus(400);
      else {
        mem.remove(function(err) {
          if (err) {
            res.status(400).json(err);
          } else {
            // FIXME might need to delete the user?
            res.sendStatus(204);
          }
        });
      }
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
