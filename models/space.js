'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
var _ = require("underscore");
var crypto = require('crypto');

module.exports.spaceSchema = Schema({
  name: {type: String, default: "New Space"},
  space_type: {type: String, default: "space"},

  creator : { type: Schema.Types.ObjectId, ref: 'User' },
  parent_space_id: Schema.Types.ObjectId,

  access_mode: {type: String, default: "private"}, // "public" || "private"
  password: String,
  edit_hash: String,
  edit_slug: String,
  editors_locking: Boolean,

  thumbnail_uri: String,
  stats: {
    num_children: Number,
    total_spaces: Number,
    total_folders: Number,
    storage_bytes: Number,
  },
  
  advanced: {
    type: {
      width: Number,
      height: Number,
      margin: Number,
      background_color: String,
      background_uri: String,
      background_repeat: Boolean,
      grid_size: Number,
      grid_divisions: Number,
      gutter: Number,
      columns: Number,
      column_max_width: Number,
      columns_responsive: Number,
      row_max_height: Number,
      padding_horz: Number,
      padding_vert: Number
    },
    default: {
      width: 200,
      height: 400,
      margin: 0,
      background_color: "rgba(255,255,255,1)"
    }
  },
  blocked_at: {type: Date, default: Date.now},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  thumbnail_updated_at: {type: Date},
  thumbnail_url: String
});

module.exports.spaceSchema.index({ creator: 1, parent_space_id: 1, created_at: 1, updated_at: 1, edit_hash: 1});
module.exports.spaceSchema.statics.allForUser = function (user, callback) {
  return this.find({user_id: user_id}, callback);
};

module.exports.spaceSchema.statics.getMemberships = function (err, callback) {
  callback(null, {});
};

var getRecursiveSubspacesForSpace = (parentSpace, cb) => {
  if (parentSpace.space_type == "folder") {
    Space.find({
      "parent_space_id": parentSpace._id
    }).exec((err, subspaces) => {
      async.map(subspaces, (space, innerCb) => {
        getRecursiveSubspacesForSpace(space, (err, spaces) => {
          innerCb(err, spaces);
        });
      }, (err, subspaces) => {
        var flattenSubspaces = _.flatten(subspaces);
        flattenSubspaces.push(parentSpace);
        cb(null, flattenSubspaces);
      });
    });
  } else {
    cb(null, [parentSpace]);
  }
};

module.exports.spaceSchema.statics.getRecursiveSubspacesForSpace = getRecursiveSubspacesForSpace;

var roleMapping = {
  "none": 0,
  "viewer": 1,
  "editor": 2,
  "admin": 3
}

module.exports.spaceSchema.statics.roleInSpace = (originalSpace, user, cb) => {
  if (user.home_folder_id.toString() === originalSpace._id.toString()) {
    cb(null, "admin");
    return;
  }

  if (originalSpace.creator) {
    if (originalSpace.creator._id.toString() === user._id.toString()) {
      cb(null, "admin");
      return;
    }
  }

  var findMembershipsForSpace = function(space, allMemberships, prevRole) {
    Membership.find({
      "space": space._id
    }, (err, parentMemberships) => {
      var currentMemberships = parentMemberships.concat(allMemberships);

      if (space.parent_space_id) {
        Space.findOne({
          "_id": space.parent_space_id
        }, function(err, parentSpace) {

          var role = prevRole;
          if(role == "none"){
            if(originalSpace.access_mode == "public") {
              role = "viewer";
            }
          }
    
          findMembershipsForSpace(parentSpace, currentMemberships, role);
        });
      } else {
        // reached the top
        var role = prevRole;
        space.memberships = currentMemberships;
        currentMemberships.forEach(function(m, i) {
          if (m.user && m.user.equals(user._id)) {
            if (m.role != null) {
              if (roleMapping[m.role] > roleMapping[role]) {
                role = m.role;
              }
            }
          }
        });

        cb(err, role);
      }
    });
  };
  findMembershipsForSpace(originalSpace, [], "none");
}

module.exports.spaceSchema.statics.recursiveDelete = (space, cb) => {
  space.remove(function(err) {

    Action.remove({
      space: space
    }, function(err) {
      if (err)
        console.error("removed actions for space: ", err);
    });

    Membership.remove({
      space: space
    }, function(err) {
      if (err)
        console.error("removed memberships for space: ", err);
    });

    if (space.space_type === "folder") {
      Space
        .find({
          parent_space_id: space._id
        })
        .exec(function(err, spaces) {
          async.eachLimit(spaces, 10, function(subSpace, innerCb) {
            module.exports.spaceSchema.statics.recursiveDelete(subSpace, function(err) {
              innerCb(err);
            });
          }, function(err) {
            cb(err);
          });
        });

    } else {

      Artifact.find({
        space_id: space._id
      }, function(err, artifacts) {
        if (err) cb(err);
        else {
          async.eachLimit(artifacts, 20, function(a, innerCb) {
            a.remove(function(err) {
              innerCb(null, a);
            });
          }, function(err) {
            cb(err);
          });

        }
      });
    }
  });
};

var duplicateRecursiveSpace = (space, user, depth, cb, newParentSpace) => {
  var newSpace = new Space(space);
  newSpace._id = mongoose.Types.ObjectId();

  if (newParentSpace) {
    newSpace.parent_space_id = newParentSpace._id;
  } else {
    newSpace.name = newSpace.name + " (b)";
  }

  newSpace.creator = user;
  newSpace.created_at = new Date();
  newSpace.updated_at = new Date();

  if (newSpace.space_type === "space") {
    newSpace.edit_hash = crypto.randomBytes(64).toString('hex').substring(0, 7);
  }

  newSpace.save(function(err) {

    if (newSpace.space_type === "folder" && depth < 10) {

      Space
        .find({
          parent_space_id: space._id
        })
        .exec(function(err, spaces) {
          async.eachLimit(spaces, 10, function(subSpace, innerCb) {

            duplicateRecursiveSpace(subSpace, user, ++depth, function(err, newSubSpace) {
              innerCb(err, newSubSpace);
            }, newSpace);

          }, function(err, allNewSubspaces) {
            cb(err, newSpace);
          });
        });

    } else {

      Artifact.find({
        space_id: space._id
      }, function(err, artifacts) {
        if (err) innerCb(err);
        else {
          async.eachLimit(artifacts, 20, function(a, innerCb) {
            var newArtifact = new Artifact(a);
            newArtifact._id = mongoose.Types.ObjectId();
            newArtifact.space_id = newSpace._id;
            newArtifact.created_at = new Date();
            newArtifact.updated_at = new Date();

            newArtifact.save(function(err) {
              innerCb(null, newArtifact);
            });

          }, function(err, allNewArtifacts) {
            cb(err, newSpace);
          });
        }
      });
    }

  });
};

module.exports.spaceSchema.statics.duplicateSpace = duplicateRecursiveSpace;
