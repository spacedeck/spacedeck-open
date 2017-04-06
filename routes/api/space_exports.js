"use strict";
var config = require('config');
require('../../models/schema');

var redis = require('../../helpers/redis');
var mailer = require('../../helpers/mailer');
var uploader = require('../../helpers/uploader');
var space_render = require('../../helpers/space-render');
var phantom = require('../../helpers/phantom');

var async = require('async');
var moment = require('moment');
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
var sanitizeHtml = require('sanitize-html');

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

router.get('/png', function(req, res, next) {
  var triggered = new Date();

  var s3_filename = "s" + req.space._id + "/" + "thumb_" + triggered.getTime() + ".jpg";

  if (!req.space.thumbnail_updated_at || req.space.thumbnail_updated_at < req.space.updated_at || !req.space.thumbnail_url) {

    Space.update({
      "_id": req.space._id
    }, {
      "$set": {
        thumbnail_updated_at: triggered
      }
    }, function(a, b, c) {});

    phantom.takeScreenshot(req.space, "png",
                           function(local_path) {
      var localResizedFilePath = local_path + ".thumb.jpg";
      gm(local_path).resize(640, 480).quality(70.0).autoOrient().write(localResizedFilePath, function(err) {
        
        if (err) {
          console.error("screenshot resize error: ", err);
          res.status(500).send("Error taking screenshot.");
          return;
        }

        uploader.uploadFile(s3_filename, "image/jpeg", localResizedFilePath, function(err, thumbnailUrl) {

          if (err) {
            console.error("screenshot s3 upload error. filename: " + s3_filename + " details: ", err);
            res.status(500).send("Error uploading screenshot.");
            return;
          }

          var oldUrl = req.space.thumbnail_url;

          Space.update({
            "_id": req.space._id
          }, {
            "$set": {
              thumbnail_url: thumbnailUrl
            }
          }, function(a, b, c) {
            res.redirect(thumbnailUrl);

            try {
              if (oldUrl) {
                var oldPath = url.parse(oldUrl).pathname;
                uploader.removeFile(oldPath, function(err, res) {});
              }
              fs.unlink(local_path);
            } catch (e) {
              console.error(e);
            }
          });

          try {
            fs.unlink(localResizedFilePath);
          } catch (e) {
            console.error(e);
          }
        });
      });
    },
    function() {
      // on_error
      console.error("phantom could not create screenshot for space " + req.space_id);
      res.status(404).send("Not found");
    });
  } else {
    res.redirect(req.space.thumbnail_url);
  }
});

function make_export_filename(space, extension) {
  return space.name.replace(/[^\w]/g, '') + "-" + space._id + "-" + moment().format("YYYYMMDD-HH-mm-ss") + "." + extension;
}

router.get('/list', function(req, res, next) {

  if (req.user) {
    if (req.spaceRole == "admin" ||  req.spaceRole == "editor") {

      if (req.space.space_type == "space") {
        Artifact.find({
          space_id: req.space._id
        }).exec(function(err, artifacts) {
          async.map(artifacts, function(a, cb) {
            if (a.user_id) {
              User.findOne({
                "_id": a.user_id
              }).exec(function(err, user) {
                a.user = user;

                if (a.last_update_user_id) {
                  User.findOne({
                    "_id": a.last_update_user_id
                  }).exec(function(err, updateUser) {
                    a.update_user = updateUser;
                    cb(null, a);
                  });
                } else {
                  cb(null, a);
                }
              });
            } else {
              cb(null, a);
            }
          }, function(err, mappedArtifacts) {

            req.space.artifacts = mappedArtifacts.map(function(a) {
              a.description = sanitizeHtml(a.description, {
                allowedTags: [],
                allowedAttributes: []
              });

              if (a.payload_uri) {
                var parsed = url.parse(a.payload_uri);
                var fileName = path.basename(parsed.pathname) || "file.bin";
                a.filename = fileName;
              }

              return a;
            });

            res.render('artifact_list', {
              space: req.space
            });
          });
        });
      } else {
        Space.getRecursiveSubspacesForSpace(req.space, (err, subspaces) => {
          res.render('space_list', {
            subspaces: subspaces.map((s) => {
              s.ae_link = config.endpoint + '/s/' + s.edit_hash + (s.edit_slug ? ('-'+s.edit_slug) : '')
              return s;
            }),
            space: req.space
          });
        });
      }
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
});

router.get('/pdf', function(req, res, next) {
  var s3_filename = make_export_filename(req.space, "pdf");

  phantom.takeScreenshot(req.space, "pdf", function(local_path) {
    uploader.uploadFile(s3_filename, "application/pdf", local_path, function(err, url) {
      res.status(201).json({
        url: url
      });
      fs.unlink(local_path);
    });
  }, (err) => {
    res.status(500).json({
      error: "PDF could not created (500)"
    });
  });
});

router.get('/zip', function(req, res, next) {
  Artifact.find({
    space_id: req.space._id
  }, function(err, artifacts) {

    if (!artifacts || !artifacts.length || err) {
      res.status(404).json({
        "error": "no artifacts"
      });
      return;
    }

    var localPath = "/tmp/" + req.space._id;

    try {
      var files = fs.readdirSync(localPath);
      for (var i = 0; i < files.length; i++) {
        console.log("[zip export] unlink old file: ", localPath + "/" + files[i]);
        if (files[i] != "." && files[i] != "..") {
          fs.unlinkSync(localPath + "/" + files[i]);
        }
      }
      fs.rmdirSync(localPath);
    } catch (e) {
      console.error(e);
    }

    var used_filenames = {};

    fs.mkdir(localPath, function(err, cb) {
      async.eachLimit(artifacts, 10, function(artifact, cb) {
        try {
          if (artifact.payload_uri) {
            if (artifact.payload_uri.indexOf("https://") > -1 || artifact.payload_uri.indexOf("http://") > -1) {
              var parsed = url.parse(artifact.payload_uri);
              var fileName = path.basename(parsed.pathname) || "file.bin";

              if (fileName.length > 128) {
                fileName = fileName.substr(fileName.length - 128);
              }

              if (used_filenames[fileName]) {
                // if there is a fileName collision, we insert a number before the extension
                // to differentiate
                var ext = path.extname(fileName);
                fileName = path.basename(fileName, ext) + "_" + (parseInt(Math.random() * 10000)) + ext;
              }
              used_filenames[fileName] = true;

              //fix for old artifacts where no .pdf is in the filename
              if (artifact.mime == "application/pdf" && fileName.indexOf(".pdf") < 0) {
                fileName = fileName + ".pdf";
              }
              if (artifact.mime == "image/png" && fileName.indexOf(".png") < 0) {
                fileName = fileName + ".png";
              }

              var localFilePath = localPath + '/' + fileName;

              request
                .get(artifact.payload_uri)
                .on('error', function(err) {
                  console.error(err);
                  cb(null, artifact.payload_uri);
                })
                .on('end', function() {
                  cb(null, artifact.payload_uri);
                }).pipe(fs.createWriteStream(localFilePath));

            } else {
              cb(null, artifact.payload_uri);
            }
          } else {
            cb(null, artifact.payload_uri);
          }
        } catch (e) {
          console.log(e);
          cb(null);
        }

      }, function(err, payloads) {

        var outputPath = '/tmp/' + req.space._id + '.zip';
        var output = fs.createWriteStream(outputPath);
        var archive = archiver('zip');

        output.on('close', function() {
          var name = make_export_filename(req.space, "zip");
          uploader.uploadFile(name, "application/zip", outputPath, function(err, url) {
            res.status(201).json({
              url: url
            });

            try {
              fs.unlink(outputPath);
            } catch (e) {
              console.error(e);
            }
          });
        });

        archive.on('error', function(err) {
          console.error(err);
        });

        archive.pipe(output);
        archive.directory(localPath, false, {
          date: new Date()
        });
        archive.finalize();
      });
    });
  });
});

router.get('/html', function(req, res) {
  Artifact.find({
    space_id: req.space._id
  }, function(err, artifacts) {
    var space = req.space;
    res.send(space_render.render_space_as_html(space, artifacts));
  });
});

router.get('/path', (req, res) => {
  // build up a breadcrumb trail (path)
  var path = [];
  var buildPath = (space) => {
    if (space.parent_space_id) {
      Space.findOne({
        "_id": space.parent_space_id
      }, (err, parentSpace) => {
        if (space._id == parentSpace._id) {
          console.log("error: circular parent reference for space " + space._id);
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

module.exports = router;
