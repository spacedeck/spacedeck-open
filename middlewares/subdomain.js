'use strict';

require('../models/schema');
var config = require('config');

module.exports = (req, res, next) => {
  let host = req.headers.host;
  Team.getTeamForHost(host, (err, team, subdomain) => {
    if (subdomain) {
      if (!err && team) {
        req.subdomainTeam = team;
        req.subdomain = subdomain;
        next()
      } else {
        if (req.accepts('text/html')) {
          res.status(404).render('not_found', {
            title: 'Page Not Found.'
          });
        } else if (req.accepts('application/json')) {
          res.status(404).json({
            "error": "not_found"
          });
        } else {
          res.status(404).render('not_found', {
            title: 'Page Not Found.'
          });
        }
      }
    } else {
      next();
    }
  });
}
