'use strict';

require('../models/db');
var config = require('config');

module.exports = (req, res, next) => {
  var err = new Error('Not Found');
  if (req.accepts('text/html')) {
    res.status(404).render('not_found', {
      title: 'Page Not Found.'
    });
  } else if (req.accepts('application/json')) {
    res.status(404).json({
      "error": "not_found"
    });
  } else {
    res.status(404).send("Not Found.");
  }
}
