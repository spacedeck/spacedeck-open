'use strict';

const db = require('../models/db');
const { Op } = require("sequelize");
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
      db.getUserRoleInSpace(space, req.user, function(newRole) {
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

  // find space by id or slug
  db.Space.findOne({where: {
                    [Op.or]: [
                      {"_id": spaceId},
                      {"edit_slug": spaceId}
                    ]
  }}).then(function(space) {

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
        // space is private
        
        // special permission for screenshot/pdf export from backend
        if (req.query['api_token'] && req.query['api_token'] == config.get('export_api_secret')) {
          finalizeReq(space, "viewer");
          return;
        }

        if (req.user) {
          db.getUserRoleInSpace(space, req.user, function(role) {
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
  });
}
