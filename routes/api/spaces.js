"use strict";
var config = require('config');
const os = require('os');
const db = require('../../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { v4: uuidv4 } = require('uuid');

var redis = require('../../helpers/redis');
var mailer = require('../../helpers/mailer');
var uploader = require('../../helpers/uploader');
var space_render = require('../../helpers/space-render');
var exporter = require('../../helpers/exporter');
var payloadConverter = require('../../helpers/artifact_converter');

var slug = require('slug');

var fs = require('fs');
var async = require('async');
var _ = require("underscore");
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

function listSpacesInFolder(req, res, parent_space_id) {
  db.Space
    .findOne({where: {
      _id: parent_space_id
    }})
    .then(function(space) {
      if (space) {
        function spacesForRole(role) {
          if (role == "none") {
            if (space.access_mode == "public") {
              role = "viewer";
            }
          }
          if (role != "none") {
            db.Space
              .findAll({where:{
                parent_space_id: parent_space_id
              }, include:[db.CreatorSafeInclude(db)]})
              .then(function(spaces) {
                res.status(200).json(spaces);
              });
          } else {
            res.status(403).json({"error": "not authorized"});
          }
        }

        if (req["spaceAuth"] && space.edit_hash) {
          // TODO could be editor, too
          spacesForRole("none");
        } else {
          db.getUserRoleInSpace(space, req.user, spacesForRole);
        }
      } else {
        res.status(404).json({"error": "space not found"});
      }
    });
}

router.get('/', function(req, res, next) {

  if (req.query.parent_space_id && req["spaceAuth"]) {
    // list subspaces of a space authorized anonymously
    listSpacesInFolder(req, res, req.query.parent_space_id);
    return;
  }

  if (!req.user) {
    res.status(403).json({
      error: "auth required"
    });
  } else {
    if (req.query.search) {
      db.Membership.findAll({where:{
        user_id: req.user._id
      }}).then(memberships => {
        // search for spaces

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
          [Op.or]: [{"creator_id": req.user._id},
                   {"_id": {[Op.in]: spaceIds}},
                   {"parent_space_id": {[Op.in]: spaceIds}}],
          name: {[Op.like]: "%"+req.query.search+"%"}
        }, include: [db.CreatorSafeInclude(db)]};

        db.Space
          .findAll(q)
          .then(function(spaces) {
            res.status(200).json(spaces);
          });
      });

    } else if (req.query.parent_space_id && req.query.parent_space_id != req.user.home_folder_id) {
      // list spaces in a folder

      listSpacesInFolder(req, res, req.query.parent_space_id);
    } else {
      // list home folder and spaces/folders that the user is a member of

      db.Membership.findAll({ where: {
        user_id: req.user._id
      }}).then(memberships => {
        if (!memberships) memberships = [];

        var validMemberships = memberships.filter(function(m) {
          if (!m.space_id || (m.space_id == "undefined"))
            return false;
          return true;
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
          .findAll({where: q, include: [db.CreatorSafeInclude(db)]})
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
      attrs.edit_slug = attrs.edit_slug || slug(attrs.name);
      attrs.access_mode = "private";

      db.Space.create(attrs).then(createdSpace => {
        // create initial admin membership
        var membership = {
          _id: uuidv4(),
          user_id: req.user._id,
          space_id: attrs._id,
          role: "admin",
          state: "active"
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
      attrs.parent_space_id = req.user.home_folder_id;
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
  delete newAttr['creator'];
  delete newAttr['creator_id'];
  delete newAttr['space_type'];

  if (req['spaceRole'] != "admin") {
    delete newAttr['access_mode']
    delete newAttr['password']
    delete newAttr['edit_hash']
    delete newAttr['edit_slug']
    delete newAttr['editors_locking']
  }

  db.Space.update(newAttr, {where: {
    "_id": space._id
  }}).then(rows => {
    db.Space.findOne({ where: {
      "_id": space._id
    }}).then(space => {
      res.distributeUpdate("Space", space);
    });
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
            console.error("remove old background error:", err);
          });
        }

        db.Space.update({
          background_uri: backgroundUrl
        }, {
          where: { "_id": space._id }
        }).then(rows => {
          fs.unlink(localFilePath, function(err) {
            if (err) {
              console.error(err);
              res.status(400).json(err);
            } else {
              db.Space.findOne({ where: {
                "_id": space._id
              }}).then(space => {
                console.log("========== space update:", space);
                res.distributeUpdate("Space", space);
              });
            }
          });
        });
      }
    });
  });
});

router.delete('/:id', function(req, res, next) {
  if (req.user) {
    const space = req.space;

    if (req.spaceRole == "admin") {
      const attrs = req.body;
      space.destroy().then(function() {
        res.distributeDelete("Space", space);
      });
    } else {
      res.status(403).json({
        "error": "requires admin role"
      });
    }
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
