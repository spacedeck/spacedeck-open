"use strict";

var config = require('config');
require('../../models/schema');

var redis = require('../../helpers/redis');
var mailer = require('../../helpers/mailer');

var fs = require('fs');
var _ = require('underscore');
var crypto = require('crypto');
var bcrypt = require('bcryptjs');

var express = require('express');
var router = express.Router();
var userMapping = { '_id': 1, 'nickname': 1, 'email': 1};

router.get('/:id', (req, res) => {
  res.status(200).json(req.user.team);
});

router.put('/:id', (req, res) => {
  var team = req.user.team;
  if (!team) {
    res.status(400).json({"error": "user in no team"});
  } else {
    var newAttr = req.body;
    newAttr.updated_at = new Date();
    delete newAttr['_id'];

    if(newAttr['subdomain']) {
      newAttr['subdomain'] = newAttr['subdomain'].toLowerCase();
    }
    const new_subdomain = newAttr['subdomain'];
    var forbidden_subdomains = [];

    function updateTeam() {
      Team.findOneAndUpdate({"_id": team._id}, {"$set": newAttr}, {"new": true}, (err, team) => {
        if (err) res.status(400).json(err);
        else {
          res.status(200).json(team);
        }
      });  
    }
    
    var isForbidden = forbidden_subdomains.indexOf(new_subdomain) > -1;
    if (isForbidden) {
      res.bad_request("subdomain not valid");
    } else {
      if (new_subdomain) {
        Team.findOne({"domain": new_subdomain}).exec((err, team) => {
          if(team) {
            res.bad_request("subdomain already used");
          } else {
            updateTeam()
          }
        });
      } else {
        updateTeam()
      }
    }
  }
});

router.get('/:id/memberships', (req, res) => {
  User
    .find({team: req.user.team})
    .populate("team")
    .exec(function(err, users){
      if (err) res.status(400).json(err);
      else {
        res.status(200).json(users);
      }
    });
});

router.post('/:id/memberships', (req, res, next) => {
  if (req.body.email) {
    const email = req.body.email.toLowerCase();
    const team  = req.user.team;

    User.findOne({"email": email}).populate('team').exec((err, user) => {
      if (user) {
        const code = crypto.randomBytes(64).toString('hex').substring(0,7);
        team.invitation_codes.push(code);
        team.save((err) => {
          if (err){ res.status(400).json(err); }
          else {
            mailer.sendMail(email, req.i18n.__("team_invite_membership_subject", team.name), req.i18n.__("team_invite_membership_body", team.name), { action: {
              link: config.endpoint + "/teams/" + req.user.team._id + "/join?code=" + code,
              name: req.i18n.__("team_invite_membership_action"),
              teamname: team.name
            }});

            res.status(201).json(user);
          }
        });

      } else {
        // complete new user
        const password = crypto.randomBytes(64).toString('hex').substring(0,7);
        const confirmation_token = crypto.randomBytes(64).toString('hex').substring(0,7);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            crypto.randomBytes(16, (ex, buf) => {
              const token = buf.toString('hex');

              var u = new User({
                email: email,
                account_type: "email",
                nickname: email,
                team: team._id,
                password_hash: hash,
                payment_plan_key: team.payment_plan_key,
                confirmation_token: confirmation_token,
                preferences: {
                  language: req.i18n.locale
                }
              });

              u.save((err) => {
                if(err) res.sendStatus(400);
                else {
                  var homeSpace = new Space({
                    name: req.i18n.__("home"),
                    space_type: "folder",
                    creator: u
                  });

                  homeSpace.save((err, homeSpace) => {
                    if (err) res.sendStatus(400);
                    else {
                      u.home_folder_id = homeSpace._id;
                      u.save((err) => {

                        User.find({"_id": {"$in": team.admins }}).exec((err, admins) => {
                          admins.forEach((admin) => {
                            var i18n = req.i18n;
                            if(admin.preferences && admin.preferences.language){
                              i18n.setLocale(admin.preferences.language || "en");
                            }
                            mailer.sendMail(admin.email, i18n.__("team_invite_membership_subject", team.name), i18n.__("team_invite_admin_body",  email, team.name, password), { teamname: team.name });
                          });
                        });

                        mailer.sendMail(email, req.i18n.__("team_invite_membership_subject", team.name), req.i18n.__("team_invite_user_body", team.name, password), { action: {
                          link: config.endpoint + "/users/byteam/" + req.user.team._id + "/join?confirmation_token=" + confirmation_token,
                          name: req.i18n.__("team_invite_membership_action")
                        }, teamname: team.name });

                        if (err) res.status(400).json(err);
                        else{
                          res.status(201).json(u)
                        }
                      });
                    }
                  });
                }
              });
            });
          });    
        });
      }
    });
  } else {
    res.status(400).json({"error": "email missing"});
  }
});

router.put('/:id/memberships/:user_id', (req, res) => {
  User.findOne({_id: req.params.user_id}, (err,mem) => {
    if (err) res.sendStatus(400);
    else {
      if(user.team._id == req.user.team._id){
        user['team'] = req.user.team._id;
        user.save((err) => {
          res.sendStatus(204);
        });
      } else {
        res.sendStatus(403);
      }
    }
  });
});

router.get('/:id/memberships/:user_id/promote', (req, res) => {
  User.findOne({_id: req.params.user_id}, (err,user) => {
    if (err) res.sendStatus(400);
    else {
      if (user.team.toString() == req.user.team._id.toString()) {
        var team = req.user.team;
        var adminIndex = team.admins.indexOf(user._id);

        if (adminIndex == -1) {
          team.admins.push(user._id);
          team.save((err, team) => {
            res.status(204).json(team);
          });
        } else {
          res.status(400).json({"error": "already admin"});
        }
      } else {
        res.status(403).json({"error": "team id not correct"});
      }
    }
  });
});

router.get('/:id/memberships/:user_id/demote', (req, res, next) => {
  User.findOne({_id: req.params.user_id}, (err,user) => {
    if (err) res.sendStatus(400);
    else {
      if (user.team.toString() == req.user.team._id.toString()) {
        const team = req.user.team;
        const adminIndex = team.admins.indexOf(user._id);

        if(adminIndex > -1) {
          team.admins.splice(adminIndex,1);
          team.save((err, team) => {
            res.status(204).json(team);
          });
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(403);
      }
    }
  });
});

router.delete('/:id/memberships/:user_id', (req, res) => {
  User.findOne({_id: req.params.user_id}).populate('team').exec((err,user) => {
    if (err) res.sendStatus(400);
    else {
      const currentUserId = req.user._id.toString();
      const team = req.user.team;

      const isAdmin = (req.user.team.admins.filter( mem => { 
        return mem == currentUserId; 
      }).length == 1)
      
      if (isAdmin) {
        user.team = null;
        user.payment_plan_key = "free";
        user.save( err => {
          const adminIndex = team.admins.indexOf(user._id);
          if(adminIndex > -1) {
            team.admins.splice(adminIndex,1);
            team.save((err, team) => {
              console.log("admin removed");
            });
          }

          res.sendStatus(204);
        });
      } else {
        res.status(403).json({"error": "not admin"});
      }
    }
  });
});

module.exports = router;
