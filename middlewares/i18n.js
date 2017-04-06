'use strict';

require('../models/schema');
var config = require('config');

module.exports = (req, res, next) => {
  req.i18n.setLocale(req.i18n.prefLocale);

  if (req.cookies.spacedeck_locale) {
    req.i18n.setLocaleFromCookie();
  }

  if (req.user && req.user.preferences.language) {
    req.i18n.setLocale(req.user.preferences.language);
  }
  next();
}