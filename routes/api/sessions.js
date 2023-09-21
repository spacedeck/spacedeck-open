"use strict";

var config = require('config');
const db = require('../../models/db');

var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var URL = require('url').URL;

var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  var data = req.body;
  if (!data.email || !data.password) {
    res.status(400).json({});
    return;
  }

  var email = req.body.email.toLowerCase();
  var password = req.body["password"];

  db.User.findOne({where: {email: email}})
    .catch(err => {
      res.sendStatus(404);
    })
    .then(user => {
      if (!user) {
        res.sendStatus(404);
      }
      else if (bcrypt.compareSync(password, user.password_hash)) {
        crypto.randomBytes(48, function(ex, buf) {
          var token = buf.toString('hex');

          var session = {
            user_id: user._id,
            token: token,
            ip: req.ip,
            device: "web",
            created_at: new Date()
          };

          db.Session.create(session)
            .catch(err => {
              console.error("Error creating Session:",err);
              res.sendStatus(500);
            })
            .then(() => {
              var domain = (process.env.NODE_ENV == "production") ? new URL(config.get('endpoint')).hostname : req.headers.hostname;
              res.cookie('sdsession', token, { domain: domain, httpOnly: true });
              res.status(201).json(session);
            });
        });
      } else {
        res.sendStatus(403);
      }
    });
});

router.delete('/current', function(req, res, next) {
  if (req.user) {
    var token = req.cookies['sdsession'];
    db.Session.findOne({where: {token: token}})
      .then(session => {
        session.destroy();
      });
    var domain = (process.env.NODE_ENV == "production") ? new URL(config.get('endpoint')).hostname : req.headers.hostname;
    res.clearCookie('sdsession', { domain: domain });
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
