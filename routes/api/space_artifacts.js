"use strict";

var config = require('config');
require('../../models/schema');

var payloadConverter = require('../../helpers/artifact_converter');
var redis = require('../../helpers/redis');

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

// ARTIFACTS

router.get('/', (req, res) => {
  Artifact.find({
    space_id: req.space._id
  }).exec((err, artifacts) => {
    async.map(artifacts, (a, cb) => {
      a = a.toObject();
      if (a.user_id) {
        User.findOne({
          "_id": a.user_id
        }).select({
          "_id": 1,
          "nickname": 1,
          "email": 1
        }).exec((err, user) => {
          if (user) {
            a['user'] = user.toObject();
          }
          cb(err, a);
        });
      } else {
        cb(null, a);
      }
    }, (err, mappedArtifacts) => {
      if (err) res.status(400).json(err);
      else {
        res.status(200).json(mappedArtifacts);
      }
    });
  });
});

router.post('/', function(req, res, next) {
  var attrs = req.body;

  attrs['space_id'] = req.space._id;

  var artifact = new Artifact(attrs);

  artifact.created_from_ip = req['real_ip'];
  
  if (req.user) {
    artifact.user_id = req.user._id;
    artifact.last_update_user_id = req.user._id;
  } else {
    artifact.last_update_editor_name = req.editor_name;
  }

  if (req.spaceRole == "editor"  ||  req.spaceRole == "admin") {
    artifact.save(function(err) {
      if (err) res.status(400).json(err);
      else {
        Space.update({
          _id: req.space._id
        }, {
          "$set": {
            updated_at: new Date()
          }
        });
        res.distributeCreate("Artifact", artifact);
      }
    });
  } else {
    res.status(401).json({
      "error": "no access"
    });
  }
});

router.post('/:artifact_id/payload', function(req, res, next) {
  if (req.spaceRole == "editor"  ||  req.spaceRole == "admin") {
    var a = req.artifact;

    var fileName = (req.query.filename || "upload.bin").replace(/[^a-zA-Z0-9_\-\.]/g, '');
    var localFilePath = "/tmp/" + fileName;
    var writeStream = fs.createWriteStream(localFilePath);
    var stream = req.pipe(writeStream);

    var progress_callback = function(progress_msg) {
      a.description = progress_msg;
      a.save();
      redis.sendMessage("update", a, a.toJSON(), req.channelId);
    };

    stream.on('finish', function() {
      payloadConverter.convert(a, fileName, localFilePath, function(error, artifact) {
        if (error) res.status(400).json(error);
        else {
          Space.update({
            _id: req.space._id
          }, {
            "$set": {
              updated_at: new Date()
            }
          });
          res.distributeUpdate("Artifact", artifact);
        }
      }, progress_callback);
    });
  } else {
    res.status(401).json({
      "error": "no access"
    });
  }
});

router.put('/:artifact_id', function(req, res, next) {
  var a = req.artifact;
  var newAttr = req.body;
  newAttr.updated_at = new Date();
  delete newAttr['_id'];

  if (req.user) {
    newAttr.last_update_user_id = req.user._id;
  } else {
    newAttr.last_update_editor_name = req.editor_name;
  }

  Artifact.findOneAndUpdate({
    "_id": a._id
  }, {
    "$set": newAttr
  }, {
    "new": true
  }, function(err, artifact) {
    if (err) res.status(400).json(err);
    else {
      Space.update({
        _id: req.space._id
      }, {
        "$set": {
          updated_at: new Date()
        }
      });
      res.distributeUpdate("Artifact", artifact);
    }
  });
});

router.delete('/:artifact_id', function(req, res, next) {
  var artifact = req.artifact;
  artifact.remove(function(err) {
    if (err) res.status(400).json(err);
    else {
      Space.update({
        _id: req.space._id
      }, {
        "$set": {
          updated_at: new Date()
        }
      });
      res.distributeDelete("Artifact", artifact);
    }
  });
});

module.exports = router;
