"use strict";
var config = require('config');
const db = require('../../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { v4: uuidv4 } = require('uuid');

var redis = require('../../helpers/redis');
var mailer = require('../../helpers/mailer');

var async = require('async');
var fs = require('fs');
var _ = require("underscore");
var request = require('request');
var url = require("url");
var path = require("path");
var glob = require('glob');
var crypto = require('crypto');

var express = require('express');
var router = express.Router({mergeParams: true});

router.get('/', function(req, res, next) {
  db.Membership
    .findAll({where: {
      space_id: req.space._id
    }, include: ['user']})
    .then(memberships => {
      res.status(200).json(memberships);
    });
});

router.post('/', function(req, res, next) {
  if (req.spaceRole == "admin") {
    var attrs = req.body;
    attrs.space_id = req.space._id;
    attrs.state = "pending";
    attrs._id = uuidv4();
    var membership = attrs;
    
    var msg = attrs.personal_message;

    if (membership.email_invited != req.user.email) {
      db.User.findOne({where:{
        "email": membership.email_invited
      }}).then(function(user) {

        // existing user? then immediately activate membership
        if (user) {
          membership.user_id = user._id;
          membership.state = "active";
        } else {
          // if not, invite via email and invite code
          membership.code = crypto.randomBytes(64).toString('hex').substring(0, 12);
        }

        db.Membership.create(membership).then(function() {
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
        });

      });

    } else {
      res.status(400).json({
        "error": "This email is already included in the Space memberships."
      });
    }

  } else {
    res.status(403).json({
      "error": "Only administrators can do that."
    });
  }
});

router.put('/:membership_id', function(req, res, next) {
  if (req.user) {
    if (req.spaceRole == "admin") {
      db.Membership.findOne({ where: {
        _id: req.params.membership_id
      }}).then(function(mem) {
        if (mem) {
          // is the user trying to change their own role?
          if (mem.user_id == req.user._id) {
            res.status(400).json({
              "error": "Cannot change your own role."
            });
          } else {
            var attrs = req.body;
            mem.role = attrs.role;
            mem.save(function() {
              res.status(201).json(mem);
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
  if (req.user && req.spaceRole == 'admin') {
    db.Membership.count({ where: {
      space_id: req.space._id,
      role: "admin"
    }}).then(function(adminCount) {
      db.Membership.findOne({ where: {
        _id: req.params.membership_id
      }}).then(function(mem) {
        // deleting an admin? need at least 1
        if (mem.role != "admin" || adminCount > 1) { 
          mem.destroy().then(function() {
            res.sendStatus(204);
          });
        } else {
          res.status(400).json({
            "error": "Space needs at least one administrator."
          });
        }
      })
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
