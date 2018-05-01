'use strict';

const db = require('../models/db');
var config = require('config');

module.exports = (req, res, next) => {
  const token = req.cookies["sdsession"];
  
  if (token && token != "null" && token != null) {
    db.Session.findOne({where: {token: token}})
      .then(session => {
        if (!session) {
          // session not found
          next();
        }
        else db.User.findOne({where: {_id: session.user_id}})
          .then(user => {
            if (!user) {
              var domain = (process.env.NODE_ENV == "production") ? new URL(config.get('endpoint')).hostname : req.headers.hostname;
              res.clearCookie('sdsession', { domain: domain });

              if (req.accepts("text/html")) {
                res.send("Please clear your cookies and try again.");
              } else if (req.accepts('application/json')) {
                res.status(403).json({
                  "error": "token_not_found"
                });
              } else {
                res.send("Please clear your cookies and try again.");
              }
              
            } else {
              req["token"] = token;
              req["user"] = user;
              next();
            }
          });
      })
      .error(err => {
        console.error("Session resolve error",err);
        next();
      });
  } else {
    next();
  }
}

