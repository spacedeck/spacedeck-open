"use strict";

var config = require('config');
require('../../models/db');

var async = require('async');
var fs = require('fs');
var _ = require("underscore");
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
};

router.get('/', function(req, res, next) {

  res.status(200).json([]);
  return;

  // FIXME TODO
  
  var showActionForSpaces = function(err, spaceIds) {
    var userMapping = {
      '_id': 1,
      'nickname': 1,
      'email': 1
    };
    
    var spaceMapping = {
      '_id': 1,
      'name': 1
    };

    var d = new Date();
    d.setDate(d.getDate() - 1);

    Action
      .find({
        created_at: {
          "$gt": d
        },
        space: {
          "$in": spaceIds
        }
      })
      .populate('space', spaceMapping)
      .populate('user', userMapping)
      .exec(function(err, actions) {
        var groupedBySpaceEvents = _.groupBy(actions, function(action) {
          return action.space._id;
        });

        var events = _.map(groupedBySpaceEvents, function(value, key) {

          var sortByDate = _.sortBy(groupedBySpaceEvents[key], function(o) {
            return o.created_at;
          });
          var lastDate = sortByDate[sortByDate.length - 1].created_at;

          var users = groupedBySpaceEvents[key].map(function(action) {
            if (action.user) {
              if (action.user._id.equals(req.user._id)) {
                return "you";
              } else {
                return action.user.nickname;
              }
            }
            return action.editor_name;
          });

          var uniqueUsers = _.unique(users);

          return {
            space: value[0].space,
            users: uniqueUsers,
            last_action: lastDate
          };
        });

        var sortedEvents = _.sortBy(events, function(o) {
          return -o.last_action;
        });
        res.status(200).json(sortedEvents);
      });
  };

  if (!req.user) {
    res.status(403).json({
      error: "auth required"
    }); 
  } else {
    if (!req.space._id.equals(req.user.home_folder_id)) {
      Space.getRecursiveSubspacesForSpace(req.space, function(err, spaces) {
        showActionForSpaces(err, spaces.map(function(s) {
          return s._id;
        }));
      });
    } else {
      async.parallel({
        bycreator: function(cb) {
          Space.find({
            creator: req.user._id
          }, function(err, spaces) {
            cb(null, spaces.map(function(s) {
              return s._id;
            }));
          });
        },
        bymembership: function(cb) {
          Membership.find({
            user: req.user,
            space: {
              "$exists": 1
            }
          }).populate("space").exec(function(err, memberships) {
            async.map(memberships, function(membership, memcb) {
              Space.getRecursiveSubspacesForSpace(membership.space, function(err, spaces) {
                cb(null, spaces.map(function(s) {
                  return s._id;
                }));
              });
            }, function(err, spaceArrays) {
              cb(null, spaceArrays.map(function(s) {
                return s._id;
              }));
            });
          });
        }
      }, function(err, results) {
        var spaceIds = _.unique(results.bycreator.concat(results.bymembership));
        showActionForSpaces(err, spaceIds);
      });
    }
  }
});

module.exports = router;
