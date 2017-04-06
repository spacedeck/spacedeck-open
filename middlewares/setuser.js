'use strict';

require('../models/schema');
var config = require('config');

module.exports = (req, res, next) => {
  const token = req.cookies["sdsession"];
  if (token && token != "null" && token !== null) {
    User.findOne({
      "sessions.token": token
    }).populate('team').exec((err, user) => {
      if (!user) {
        // FIXME
        var domain = "localhost";
        res.clearCookie('sdsession', {
          domain: domain
        });

        if (req.accepts("text/html")) {
          res.redirect("/");
        } else if (req.accepts('application/json')) {
          res.status(403).json({
            "error": "token_not_found"
          });
        } else {
          res.redirect("/");
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
