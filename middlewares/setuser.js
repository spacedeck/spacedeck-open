'use strict';

require('../models/schema');
var config = require('config');

module.exports = (req, res, next) => {
  const token = req.cookies["sdsession"];
  
  if (token && token != "null" && token !== null) {
    User.findOne({
      "sessions.token": token
    }).populate('team').exec((err, user) => {
      if (err) console.error("session.token lookup error:",err);
      if (!user) {
        res.clearCookie('sdsession');

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
  } else {
    next();
  }
}
