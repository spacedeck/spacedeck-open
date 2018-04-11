"use strict";
var config = require('config');
const db = require('../../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uuidv4 = require('uuid/v4');

var redis = require('../../helpers/redis');
var mailer = require('../../helpers/mailer');
var uploader = require('../../helpers/uploader');
var space_render = require('../../helpers/space-render');
var phantom = require('../../helpers/phantom');
var payloadConverter = require('../../helpers/artifact_converter');

var slug = require('slug');

var fs = require('fs');
var async = require('async');
var _ = require("underscore");
var mongoose = require("mongoose");
var request = require('request');
var url = require("url");
var path = require("path");
var crypto = require('crypto');
var glob = require('glob');
var gm = require('gm');
const exec = require('child_process');
var express = require('express');
var router = express.Router();

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

router.get('/', function(req, res, next) {
  if (!req.user) {
    res.status(403).json({
      error: "auth required"
    });
  } else {
    if (req.query.writablefolders) {
      db.Membership.find({where: {
        user_id: req.user._id
      }}, (memberships) => {
        
        var validMemberships = memberships.filter((m) => {
          if (!m.space_id || (m.space_id == "undefined"))
            return false;
          return true;
        });

        var editorMemberships = validMemberships.filter((m) => {
          return (m.role == "editor") || (m.role == "admin")
        });

        var spaceIds = editorMemberships.map(function(m) {
          return m.space_id;
        });

        var q = {
          "space_type": "folder",
          "$or": [{
            "creator": req.user._id
          }, {
            "_id": {
              "$in": spaceIds
            },
            "creator": {
              "$ne": req.user._id
            }
          }]
        };

        Space
          .find(q)
          .populate('creator', userMapping)
          .exec(function(err, spaces) {
            if (err) console.error(err);
            var updatedSpaces = spaces.map(function(s) {
              var spaceObj = s.toObject();
              return spaceObj;
            });

            async.map(spaces, (space, cb) => {
              Space.getRecursiveSubspacesForSpace(space, (err, spaces) => {
                var allSpaces = spaces;
                cb(err, allSpaces);
              })
            }, (err, spaces) => {

              var allSpaces = _.flatten(spaces);

              var onlyFolders = _.filter(allSpaces, (s) => {
                return s.space_type == "folder";
              })
              var uniqueFolders = _.unique(onlyFolders, (s) => {
                return s._id.toString();
              })

              res.status(200).json(uniqueFolders);

            });
          });
      });
    } else if (req.query.search) {

      db.Membership.findAll({where:{
        user: req.user._id
      }}).then(memberships => {
        
        var validMemberships = memberships.filter(function(m) {
          if (!m.space_id || (m.space_id == "undefined"))
            return false;
          else
            return true;
        });

        var spaceIds = validMemberships.map(function(m) {
          return m.space_id;
        });

        // TODO FIXME port
        var q = { where: {
          "$or": [{"creator_id": req.user._id},
                  {"_id": {"$in": spaceIds}},
                  {"parent_space_id": {"$in": spaceIds}}],
          name: new RegExp(req.query.search, "i")}
        };

        db.Space
          .findAll(q)
          //.populate('creator', userMapping)
          .then(function(spaces) {
            if (err) console.error(err);
            var updatedSpaces = spaces.map(function(s) {
              var spaceObj = s.toObject();
              return spaceObj;
            });
            res.status(200).json(spaces);
          });
      });

    } else if (req.query.parent_space_id && req.query.parent_space_id != req.user.home_folder_id) {

      db.Space
        .findOne({where: {
          _id: req.query.parent_space_id
        }})
        //.populate('creator', userMapping)
        .then(function(space) {
          if (space) {
            db.getUserRoleInSpace(space, req.user, function(role) {
              if (role == "none") {
                if(space.access_mode == "public") {
                  role = "viewer";
                }
              }

              if (role != "none") {
                db.Space
                  .findAll({where:{
                    parent_space_id: req.query.parent_space_id
                  }})
                  //.populate('creator', userMapping)
                  .then(function(spaces) {
                    res.status(200).json(spaces);
                  });
              } else {
                res.status(403).json({"error": "no authorized"});
              }
            });
          } else {
            res.status(404).json({"error": "space not found"});
          }
        });

    } else {
      db.Membership.findAll({ where: {
        user_id: req.user._id
      }}).then(memberships => {
        if (!memberships) memberships = [];
        
        var validMemberships = memberships.filter(function(m) {
          if (!m.space_id || (m.space_id == "undefined"))
            return false;
        });

        var spaceIds = validMemberships.map(function(m) {
          return m.space_id;
        });

        var q = {
          [Op.or]: [{
            "creator_id": req.user._id,
            "parent_space_id": req.user.home_folder_id
          }, {
            "_id": {
              [Op.in]: spaceIds
            },
            "creator_id": {
              [Op.ne]: req.user._id
            }
          }]
        };

        db.Space
          .findAll({where: q})
          .then(function(spaces) {
            var updatedSpaces = spaces.map(function(s) {
              var spaceObj = db.spaceToObject(s);
              return spaceObj;
            });
            res.status(200).json(spaces);
          });
      });
    }
  }
});

// create a space
router.post('/', function(req, res, next) {
  if (req.user) {
    var attrs = req.body;

    var createSpace = () => {
      attrs._id = uuidv4();
      attrs.creator_id = req.user._id;
      attrs.edit_hash = crypto.randomBytes(64).toString('hex').substring(0, 7);
      attrs.edit_slug = slug(attrs.name);
      
      db.Space.create(attrs).then(createdSpace => {
        //if (err) res.sendStatus(400);
        var membership = {
          _id: uuidv4(),
          user_id: req.user._id,
          space_id: attrs._id,
          role: "admin"
        };
        
        db.Membership.create(membership).then(() => {
          res.status(201).json(createdSpace);
        });
      });
    }

    if (attrs.parent_space_id) {
      db.Space.findOne({ where: {
        "_id": attrs.parent_space_id
      }}).then(parentSpace => {
        if (parentSpace) {
          db.getUserRoleInSpace(parentSpace, req.user, (role) => {
            if ((role == "editor") || (role == "admin")) {
              createSpace();
            } else {
              res.status(403).json({
                "error": "not editor in parent Space. role: "+role
              });
            }
          });
        } else {
          res.status(404).json({
            "error": "parent Space not found"
          });
        }
      });
    } else {
      createSpace();
    }

  } else {
    res.sendStatus(403);
  }
});

router.get('/:id', function(req, res, next) {
  res.status(200).json(req.space);
});

router.get('/:id/path', (req, res) => {
  // build up a breadcrumb trail (path)
  var path = [];
  var buildPath = (space) => {
    if (space.parent_space_id) {
      db.Space.findOne({ where: {
        "_id": space.parent_space_id
      }}).then(parentSpace => {
        if (space._id == parentSpace._id) {
          console.error("error: circular parent reference for space " + space._id);
          res.send("error: circular reference");
        } else {
          path.push(parentSpace);
          buildPath(parentSpace);
        }
      });
    } else {
      // reached the top
      res.json(path.reverse());
    }
  }
  buildPath(req.space);
});

router.put('/:id', function(req, res) {
  var space = req.space;
  var newAttr = req.body;

  if (req['spaceRole'] != "editor" && req['spaceRole'] != "admin") {
    res.sendStatus(403);
    return;
  }

  newAttr.updated_at = new Date();
  newAttr.edit_slug = slug(newAttr['name']);

  delete newAttr['_id'];
  delete newAttr['editor_name'];
  delete newAttr['creator'];

  db.Space.update(newAttr, {where: {
    "_id": space._id
  }}).then(space => {
    res.distributeUpdate("Space", space);
  });
});

router.post('/:id/background', function(req, res, next) {
  var space = req.space;
  var newDate = new Date();
  var fileName = (req.query.filename || "upload.jpg").replace(/[^a-zA-Z0-9\.]/g, '');
  var localFilePath = "/tmp/" + fileName;
  var writeStream = fs.createWriteStream(localFilePath);
  var stream = req.pipe(writeStream);

  req.on('end', function() {
    uploader.uploadFile("s" + req.space._id + "/bg_" + newDate.getTime() + "_" + fileName, "image/jpeg", localFilePath, function(err, backgroundUrl) {
      if (err) res.status(400).json(err);
      else {
        if (space.background_uri) {
          var oldPath = url.parse(req.space.background_uri).pathname;
          uploader.removeFile(oldPath, function(err) {
            console.error("removed old bg error:", err);
          });
        }

        db.Space.update({
          background_uri: backgroundUrl
        }, {
          where: { "_id": space._id }
        }, function(rows) {
          fs.unlink(localFilePath, function(err) {
            if (err) {
              console.error(err);
              res.status(400).json(err);
            } else {
              res.status(200).json(space);
            }
          });
        });
      }
    });
  });
});

var handleDuplicateSpaceRequest = function(req, res, parentSpace) {
  Space.duplicateSpace(req.space, req.user, 0, (err, newSpace) => {
    if (err) {
      console.error(err);
      res.status(400).json(err);
    } else {
      res.status(201).json(newSpace);
    }
  }, parentSpace);
}

router.post('/:id/duplicate', (req, res, next) => {
  if (req.query.parent_space_id) {
    Space.findOne({
      _id: req.query.parent_space_id
    }).populate('creator', userMapping).exec((err, parentSpace) => {
      if (!parentSpace) {
        res.status(404).json({
          "error": "parent space not found for duplicate"
        });
      } else {
        db.getUserRoleInSpace(parentSpace, req.user, (role) => {
          if (role == "admin" ||  role == "editor") {
            handleDuplicateSpaceRequest(req, res, parentSpace);
          } else {
            res.status(403).json({
              "error": "not authed for parent_space_id"
            });
          }
        });
      }
    });
  } else {
    handleDuplicateSpaceRequest(req, res);
  }
});

router.delete('/:id', function(req, res, next) {
  if (req.user) {
    const space = req.space;

    if (req.spaceRole == "admin") {
      const attrs = req.body;
      Space.recursiveDelete(space, function(err) {
        if (err) res.status(400).json(err);
        else {
          res.distributeDelete("Space", space);
        }
      });
    } else {
      res.status(403).json({
        "error": "requires admin status"
      });
    }
  } else {
    res.sendStatus(403);
  }
});

router.post('/:id/artifacts-pdf', function(req, res, next) {
  if (req.spaceRole == "editor" || req.spaceRole == "admin") {

    var withZones = (req.query.zones) ? req.query.zones == "true" : false;
    var fileName = (req.query.filename || "upload.bin").replace(/[^a-zA-Z0-9\.]/g, '');
    var localFilePath = "/tmp/" + fileName;
    var writeStream = fs.createWriteStream(localFilePath);
    var stream = req.pipe(writeStream);

    req.on('end', function() {

      var rawName = fileName.slice(0, fileName.length - 4);
      var outputFolder = "/tmp/" + rawName;
      var rights = 777;

      fs.mkdir(outputFolder, function(db) {
        var images = outputFolder + "/" + rawName + "-page-%03d.jpeg";
        
        // FIXME not portable
        exec.execFile("gs", ["-sDEVICE=jpeg", "-dDownScaleFactor=4", "-dDOINTERPOLATE", "-dNOPAUSE", "-dJPEGQ=80", "-dBATCH", "-sOutputFile=" + images, "-r250", "-f", localFilePath], {}, function(error, stdout, stderr) {
          if (error === null) {

            glob(outputFolder + "/*.jpeg", function(er, files) {
              var count = files.length;
              var delta = 10;

              var limitPerRow = Math.ceil(Math.sqrt(count));

              var startX = parseInt(req.query.x, delta);
              var startY = parseInt(req.query.y, delta);

              async.mapLimit(files, 20, function(localfilePath, cb) {

                var fileName = path.basename(localfilePath);
                var baseName = path.basename(localfilePath, ".jpeg");

                var number = parseInt(baseName.slice(baseName.length - 3, baseName.length), 10);

                gm(localFilePath).size(function(err, size) {
                  var w = 350;
                  var h = w;

                  var x = startX + (((number - 1) % limitPerRow) * w);
                  var y = startY + ((parseInt(((number - 1) / limitPerRow), 10) + 1) * w);

                  var userId;
                  if (req.user)
                    userId = req.user._id;

                  var a = new Artifact({
                    mime: "image/jpg",
                    space_id: req.space._id,
                    user_id: userId,
                    editor_name: req.guest_name,
                    board: {
                      w: w,
                      h: h,
                      x: x,
                      y: y,
                      z: (number + (count + 100))
                    }
                  });

                  payloadConverter.convert(a, fileName, localfilePath, (error, artifact) => {
                    if (error) res.status(400).json(error);
                    else {
                      if (withZones) {
                        var zone = new Artifact({
                          mime: "x-spacedeck/zone",
                          description: "Zone " + (number),
                          space_id: req.space._id,
                          user_id: userId,
                          editor_name: req.guest_name,
                          board: {
                            w: artifact.board.w + 20,
                            h: artifact.board.h + 40,
                            x: x - 10,
                            y: y - 30,
                            z: number
                          },
                          style: {
                            order: number,
                            valign: "middle",
                            align: "center"
                          }
                        });

                        zone.save((err) => {
                          redis.sendMessage("create", "Artifact", zone.toJSON(), req.channelId);
                          cb(null, [artifact, zone]);
                        });

                      } else {
                        cb(null, [artifact]);
                      }
                    }
                  });

                });

              }, function(err, artifacts) {

                // FIXME not portable
                exec.execFile("rm", ["-r", outputFolder], function(err) {
                  res.status(201).json(_.flatten(artifacts));
                  
                  async.eachLimit(artifacts, 10, (artifact_or_artifacts, cb) => {

                    if (artifact_or_artifacts instanceof Array) {
                      _.each(artifact_or_artifacts, (a) => {
                        redis.sendMessage("create", "Artifact", a.toJSON(), req.channelId);
                      });
                    } else  {
                      redis.sendMessage("create", "Artifact", artifact_or_artifacts.toJSON(), req.channelId);
                    }
                    cb(null);
                  });
                });
              });
            });
          } else {
            console.error("error:", error);
            // FIXME not portable
            exec.execFile("rm", ["-r", outputFolder], function(err) {
              fs.unlink(localFilePath);
              res.status(400).json({});
            });
          }
        });
      });
    });
  } else {
    res.status(401).json({
      "error": "no access"
    });
  }
});

module.exports = router;
