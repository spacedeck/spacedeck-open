'use strict';

require('../models/schema');
var config = require('config');
var _ = require('underscore');

module.exports = (req, res, next) => {
  res.oldRender = res.render;
  res.render = function(template, params) {

    var team = req.subdomainTeam;
    if (team) {
      team = _.pick(team.toObject(), ['_id', 'name', 'subdomain', 'avatar_original_uri']);
    } else {
      team = null;
    }

    const addParams = {
      locale: req.i18n.locale,
      config: config,
      subdomain_team: team,
      user: req.user,
      csrf_token: "",
      socket_auth: req.token
    };

    const all = _.extend(params, addParams);
    res.oldRender(template, all);
  };
  next();
}