"use strict";
var config = require('config');
const db = require('../../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { v4: uuidv4 } = require('uuid');

var redis = require('../../helpers/redis');
var mailer = require('../../helpers/mailer');
var uploader = require('../../helpers/uploader');
var space_render = require('../../helpers/space-render');
var exporter = require('../../helpers/exporter');

var async = require('async');
var fs = require('fs');
var _ = require("underscore");
var archiver = require('archiver');
var request = require('request');
var url = require("url");
var path = require("path");
var crypto = require('crypto');
var glob = require('glob');

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
  db.Message.findAll({where:{
    space_id: req.space._id
  }, include: ['user']})
    .then(function(messages) {
      res.status(200).json(messages);
    });
});

router.post('/', function(req, res, next) {
  var attrs = req.body;
  attrs.space_id = req.space._id;

  if (req.user) {
    attrs.user = req.user;
    attrs.user_id = req.user._id;
  } else {
    attrs.user = null;
  }

  var msg = attrs;
  msg._id = uuidv4();

  db.Message.create(msg).then(function() {
    if (msg.message.length <= 1) return;
    // TODO reimplement notifications
    res.distributeCreate("Message", msg);
  });
});

router.delete('/:message_id', function(req, res, next) {
  db.Message.findOne({where:{
    "_id": req.params.message_id
  }}).then(function(msg) {
    if (!msg) {
      res.sendStatus(404);
    } else {
      msg.destroy().then(function() {
        res.distributeDelete("Message", msg);
      });
    }
  });
});

module.exports = router;
