"use strict";

var config = require('config');

const os = require('os');
const db = require('../../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { v4: uuidv4 } = require('uuid');

var payloadConverter = require('../../helpers/artifact_converter');
var redis = require('../../helpers/redis');

var async = require('async');
var fs = require('fs');
var _ = require("underscore");
var archiver = require('archiver');
var request = require('request');
var url = require("url");
var path = require("path");
var crypto = require('crypto');
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
  db.Artifact.findAll({where: {
    space_id: req.space._id
  }}).then(artifacts => {
    async.map(artifacts, (a, cb) => {
      db.unpackArtifact(a);

      if (a.user_id) {
        // FIXME JOIN
        /*User.findOne({where: {
          "_id": a.user_id
        }}).select({
          "_id": 1,
          "nickname": 1,
          "email": 1
        }).exec((err, user) => {
          if (user) {
            a['user'] = user.toObject();
          }
          cb(err, a);
        });*/
        cb(null, a);
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

  var artifact = attrs;
  artifact._id = uuidv4();

  if (req.user) {
    artifact.user_id = req.user._id;
    artifact.last_update_user_id = req.user._id;
  } else {
    artifact.last_update_editor_name = req.editor_name;
  }

  db.packArtifact(artifact);

  if (req.spaceRole == "editor" || req.spaceRole == "admin") {
    db.Artifact.create(artifact).then(() => {
      //if (err) res.status(400).json(err);
      db.unpackArtifact(artifact);
      db.Space.update({ updated_at: new Date() }, {where: {_id: req.space._id}});
      res.distributeCreate("Artifact", artifact);
    });
  } else {
    res.status(401).json({
      "error": "Access denied"
    });
  }
});

router.post('/:artifact_id/payload', function(req, res, next) {
  if (req.spaceRole == "editor" || req.spaceRole == "admin") {
    var a = req.artifact;

    var fileName = (req.query.filename || "upload.bin").replace(/[^a-zA-Z0-9_\-\.]/g, '');

    var localFilePath = os.tmpdir() + "/" + fileName;
    var writeStream = fs.createWriteStream(localFilePath);
    var stream = req.pipe(writeStream);

    var progressCallback = function(progressMsg) {
      // merge progress message with any other changes (size/location)
      db.Artifact.findOne({where: {
        _id: a._id
      }}).then(a => {
        if (a) {
          a.description = progressMsg.toString();
          db.packArtifact(a);
          a.save();
          db.unpackArtifact(a);
          redis.sendMessage("update-self", "Artifact", a, req.channelId);
        } else {
          // artifact has been deleted
          // TODO: stop conversion process!
        }
      });
    };

    stream.on('finish', function() {
      payloadConverter.convert(a, fileName, localFilePath, function(error, artifact) {
        if (error) res.status(400).json(error);
        else {
          db.Space.update({ updated_at: new Date() }, {where: {_id: req.space._id}});
          db.unpackArtifact(artifact);
          res.distributeUpdate("Artifact", artifact, true);
        }
      }, progressCallback);
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

  db.packArtifact(newAttr);

  db.Artifact.update(newAttr, { where: {
    "_id": a._id
  }}).then(rows => {
    db.unpackArtifact(newAttr);
    db.Space.update({ updated_at: new Date() }, {where: {_id: req.space._id} });
    newAttr._id = a._id;
    res.distributeUpdate("Artifact", newAttr);
  });
});

router.delete('/:artifact_id', function(req, res, next) {
  var artifact = req.artifact;
  db.Artifact.destroy({where: { "_id": artifact._id}}).then(() => {
    db.Space.update({ updated_at: new Date() }, {where: {_id: req.space._id} });
    res.distributeDelete("Artifact", artifact);
  });
});

module.exports = router;
