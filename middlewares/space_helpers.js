'use strict';

require('../models/schema');
var config = require('config');

module.exports = (req, res, next) => {
  let spaceId = req.params.id;

  let finalizeReq = (space, role) => {
    if (role === "none") {
      res.status(403).json({
        "error": "access denied"
      });
    } else {
      req['space'] = space;
      req['spaceRole'] = role;
      res.header("x-spacedeck-space-role", req['spaceRole']);
      next();
    }
  };

  var rolePerUser = (originalSpace, user, cb) => {
    originalSpace.path = [];

    if (originalSpace._id.equals(req.user.home_folder_id) || (originalSpace.creator && originalSpace.creator._id.equals(req.user._id))) {
      cb("admin");
    } else {
      var findMembershipsForSpace = function(space, allMemberships, prevRole) {
        Membership.find({
          "space": space._id
        }, function(err, parentMemberships) {
          var currentMemberships = parentMemberships.concat(allMemberships);

          if (space.parent_space_id) {
            Space.findOne({
              "_id": space.parent_space_id
            }, function(err, parentSpace) {
              findMembershipsForSpace(parentSpace, currentMemberships, prevRole);
            });
          } else {
            // reached the top

            var role = prevRole;
            space.memberships = currentMemberships;

            if(role == "none"){
              if(originalSpace.access_mode == "public") {
                role = "viewer";
              }
            }

            currentMemberships.forEach(function(m, i) {
              if (m.user && m.user.equals(user._id)) {
                role = m.role;
              }
            });

            cb(role);
          }
        });
      };
      findMembershipsForSpace(originalSpace, [], "none");
    }
  };

  var finalizeAnonymousLogin = function(space, spaceAuth) {
    var role = "none";

    if (spaceAuth && (spaceAuth === space.edit_hash)) {
      role = "editor";
    } else {
      if (space.access_mode == "public") {
        role = "viewer";
      } else {
        role = "none";
      }
    }

    if (req.user) {
      rolePerUser(space, req.user, function(newRole) {
        if (newRole == "admin" && (role == "editor" || role == "viewer")) {
          finalizeReq(space, newRole);
        } else if (newRole == "editor" && (role == "viewer")) {
          finalizeReq(space, newRole);
        } else {
          finalizeReq(space, role);
        }
      });
    } else {
      finalizeReq(space, role);
    }
  };

  var userMapping = {
    '_id': 1,
    'nickname': 1,
    'email': 1
  };

  Space.findOne({
    "_id": spaceId
  }).populate("creator", userMapping).exec(function(err, space) {
    if (err) {
      res.status(400).json(err);
    } else {
      if (space) {

        if (space.access_mode == "public") {

          if (space.password) {
            if (req.spacePassword) {
              if (req.spacePassword === space.password) {
                finalizeAnonymousLogin(space, req["spaceAuth"]);
              } else {
                res.status(403).json({
                  "error": "password_wrong"
                });
              }
            } else {
              res.status(401).json({
                "error": "password_required"
              });
            }
          } else {
            finalizeAnonymousLogin(space, req["spaceAuth"]);
          }

        } else {
          // special permission for screenshot/pdf export from backend
          if (req.query['api_token'] && req.query['api_token'] == config.get('phantom_api_secret')) {
            finalizeReq(space, "viewer");
            return;
          }

          if (req.user) {
            rolePerUser(space, req.user, function(role) {
              if (role == "none") {
                finalizeAnonymousLogin(space, req["spaceAuth"]);
              } else {
                finalizeReq(space, role);
              }
            });
          } else {
            if (req.spaceAuth && space.edit_hash) {
              finalizeAnonymousLogin(space, req["spaceAuth"]);
            } else {
              res.status(403).json({
                "error": "auth_required"
              });
            }
          }
        }
      } else {
        res.status(404).json({
          "error": "space_not_found"
        });
      }
    }
  });
}
