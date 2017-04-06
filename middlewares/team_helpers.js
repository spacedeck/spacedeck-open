'use strict';

require('../models/schema');
var config = require('config');

module.exports = (req, res, next) => {
  if (req.user) {
    var isAdmin = req.user.team.admins.indexOf(req.user._id) >= 0;
    var correctMethod = req.method == "GET" || (req.method == "DELETE" || req.method == "PUT" || req.method == "POST");

    if (correctMethod && isAdmin) {
      next();
    } else {
      res.status(403, {
        "error": "not authorized"
      });
    }
  } else {
    res.status(403, {
      "error": "not logged in"
    });
  }
}