"use strict";

const config = require('config');
require('../models/schema');

const redis = require('../helpers/redis');
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const mailer = require('../helpers/mailer');
const _ = require('underscore');
const qr = require('qr-image');

router.get('/', (req, res) => {
  res.render('index', { title: 'Spaces' });
});

router.get('/ping', (req, res) => {
  res.status(200).json({"status": "ok"})
});

router.get('/spaces', (req, res) => {
  res.render('spacedeck', { title: 'Spaces' });
});

router.get('/not_found', (req, res) => {
  res.render('not_found', { title: 'Spaces' });
});

router.get('/confirm/:token', (req, res) => {
  res.render('spacedeck', { title: 'Space' });
});

router.get('/folders/:id', (req, res) => {
  res.render('spacedeck', {});
});

router.get('/signup', (req, res) => {
  res.render('spacedeck', {});
});

router.get('/accept/:id', (req, res) => {
  res.render('spacedeck', {});
});

router.get('/password-reset', (req, res) => {
  res.render('spacedeck', { title: 'Signup' });
});

router.get('/password-confirm/:token', (req, res) => {
  res.render('spacedeck', { title: 'Signup' });
});

router.get('/team', (req, res) => {
  res.render('spacedeck');
});

router.get('/de/*', (req, res) => {
  res.redirect("/t/de");
});

router.get('/de', (req, res) => {
  res.redirect("/t/de");
});

router.get('/fr/*', (req, res) => {
  res.redirect("/t/fr");
});

router.get('/fr', (req, res) => {
  res.redirect("/t/fr");
});

router.get('/en/*', (req, res) => {
  res.redirect("/t/en");
});

router.get('/en', (req, res) => {
  res.redirect("/t/end");
});

router.get('/it', (req, res) => {
  res.redirect("/t/en");
});

router.get('/account', (req, res) => {
  res.render('spacedeck');
});

router.get('/login', (req, res) => {
  res.render('spacedeck');
});

router.get('/logout', (req, res) => {
  res.render('spacedeck');
});

router.get('/users/oauth2callback', (req, res) => {
  res.render('spacedeck');
});

router.get('/contact', (req, res) => {
  res.render('public/contact');
});

router.get('/about', (req, res) => {
  res.render('public/about');
});

router.get('/terms', (req, res) => {
  res.render('public/terms');
});

router.get('/privacy', (req, res) => {
  res.render('public/privacy');
});

router.get('/t/:id', (req, res) => {
  res.cookie('spacedeck_locale', req.params.id, { maxAge: 900000, httpOnly: true });
  var path = "/";
  if (req.query.r=="login" || req.query.r=="signup") {
    path = "/"+req.query.r;
  }
  res.redirect(path);
});

router.get('/s/:token', (req, res) => {
  redis.rateLimit(req.real_ip, "token", function(ok) {
    if (ok) {
      var token = req.params.token; 
      if (token.split("-").length > 0) {
        token = token.split("-")[0];
      }

      Space.findOne({"edit_hash": token}).exec(function (err, space) {
        if (err) {
          res.status(404).render('not_found', { title: 'Page Not Found.' });
        } else {
          if (space) {
            if(req.accepts('text/html')){
              res.redirect("/spaces/"+space._id + "?spaceAuth=" + token);
            }else{
              res.status(200).json(space);
            }
          } else {
            if(req.accepts('text/html')){
              res.status(404).render('not_found', { title: 'Page Not Found.' });
            } else {
              res.status(404).json({});
            }
          }
        }
      });
    } else {
      res.status(429).json({"error": "Too Many Requests"});
    }
  });
});

router.get('/spaces/:id', (req, res) => {
  if (req.headers['user-agent']) {
    if (req.headers['user-agent'].match(/facebook/)) {
      Space.findOne({"_id": req.params.id }).exec(function (err, space) {
        if (err) {
          res.status(400).json(err);
        } else {
          if (space) {
            if (space.access_mode == "public") {
              Artifact.find({"space_id": req.params.id }).populate("creator").exec(function(err, artifacts) {
                space.artifacts = artifacts;
                res.render('facebook', { space: space });
              });
            } else {
              res.redirect("/?error=space_not_accessible");
            }
          } else {
            res.render('not_found', { title: 'Spaces' });
          }
        }
      });
    } else {
      // not facebook, render javascript
      res.render('spacedeck', { title: 'Space' });
    }
  } else res.render('spacedeck', { title: 'Space' });
});

router.get('/users/byteam/:team_id/join', (req, res) => {
  if (!req.user) {
    const q = {confirmation_token: req.query.confirmation_token, account_type: "email", team: req.params.team_id};
    User.findOne(q,  (err, user) => {
      if (err) {
        res.status(400).json({"error":"session.users"});
      } else {
        if (user) {
          crypto.randomBytes(48, function(ex, buf) {
            const token = buf.toString('hex');

            var session = {
              token: token,
              ip: req.ip,
              device: "web",
              created_at: new Date()
            };

            if (!user.sessions)
              user.sessions = [];

            user.sessions.push(session);
            user.confirmed_at = new Date();
            user.confirmation_token = null;

            user.save(function(err, result) {
              // FIXME
              const secure = process.env.NODE_ENV == "production" || process.env.NODE_ENV == "staging";
              const domain = (process.env.NODE_ENV == "production") ? ".spacedeck.com" : ".spacedecklocal.de";

              res.cookie('sdsession', token, { domain: domain, httpOnly: true, secure: secure});
              res.redirect("/spaces");
            });
          });
        } else {
          res.status(404).json({"error": "not found"});
        }
      }
    });

  } else {
    res.redirect("/spaces");
  }
});

router.get('/teams/:id/join', function(req, res, next) {
  if (req.user) {
    if (!req.user.team) {
      Team.findOne({"_id": req.params.id}, function(err, team) {
        if (team) {
          const idx = team.invitation_codes.indexOf(req.query.code);
          if (idx >= 0) {
            const u = req.user;
            u.team = team;

            if(!u.confirmed_at) {
              u.confirmed_at = new Date();
            }
            
            u.payment_plan_key = team.payment_plan_key;
            u.save(function(err) {
              if (err) res.status(400).json(err);
              else {
                team.invitation_condes = team.invitation_codes.slice(idx);
                team.save(function(err) {
                  team.invitation_codes = null;

                  var finish = function(team, users) {
                    User.find({"_id": {"$in": team.admins}}).exec((err, admins) => {
                      if(admins) {
                        admins.forEach((admin) => {
                          mailer.sendMail(
                            admin.email,
                            req.i18n.__("team_new_member_subject", team.name),
                            req.i18n.__("team_new_member_body", u.email, team.name)
                          );
                        });
                      }
                    });
                  }

                  User.find({team: team}, function(err, users) {
                    finish(team, users);
                    res.redirect("/spaces");
                  });
                });
              }
            });
          } else {
            res.redirect("/spaces?error=team_code_notfound");
          }
        } else {
          res.redirect("/spaces?error=team_notfound");
        }
      });
    } else {
      res.redirect("/spaces?error=team_already");
    }
  } else res.redirect("/login");
});

router.get('/qrcode/:id', function(req, res) {
  Space.findOne({"_id": req.params.id}).exec(function(err, space) {
    if (space) {
      const url = config.get("endpoint") + "/s/"+space.edit_hash;
      const code = qr.image(url, { type: 'svg' });
      res.type('svg');
      code.pipe(res);
    } else {
      res.status(404).json({
        "error": "not_found"
      });
    }
  });
});

module.exports = router;
