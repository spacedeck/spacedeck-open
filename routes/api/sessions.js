"use strict";

var config = require('config');
require('../../models/schema');

var bcrypt = require('bcryptjs');
var crypo = require('crypto');
var URL = require('url').URL;

var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  var data = req.body;
  if (data.email && data.password) {
    var email = req.body.email.toLowerCase();
    var password = req.body["password"];

    User.find({email: email, account_type: "email"}, (function (err, users) {
      if (err) {
        res.status(400).json({"error":"session.users"});
      } else {

        if (users.length == 1) {
          var user = users[0];

          if (bcrypt.compareSync(password, user.password_hash)) {
            crypo.randomBytes(48, function(ex, buf) {
              var token = buf.toString('hex');

              var session = {
                token: token,
                ip: req.ip,
                device: "web",
                created_at: new Date()
              };

              if (!user.sessions)
                user.sessions = [];

              user.sessions.push(session);

              user.save(function(err, result) {
                if (err) console.error("Error saving user:",err);
                
                var domain = (process.env.NODE_ENV == "production") ? new URL(config.get('endpoint')).hostname : "localhost";

                res.cookie('sdsession', token, { domain: domain, httpOnly: true });
                res.status(201).json(session);
              });
            });
          }else{
            res.sendStatus(403);
          }
        } else {
          res.sendStatus(404);
        }
      }
    }));
  } else {
    res.status(400).json({});
  }
});

router.delete('/current', function(req, res, next) {
  if (req.user) {
    var user = req.user;
    var newSessions = user.sessions.filter( function(session){
      return session.token != req.token;
    });
    user.sessions = newSessions;
    user.save(function(err, result) {
      var domain = new URL(config.get('endpoint')).hostname;
      res.clearCookie('sdsession', { domain: domain });
      res.sendStatus(204);
    });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
