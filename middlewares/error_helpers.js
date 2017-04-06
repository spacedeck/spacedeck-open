'use strict';

module.exports = (req, res, next) => {
  res.bad_request = (msg) => {
    if (req.accepts('text/html')) {
      res.status(400).render('error', {
        message: msg
      });
    } else {
      res.status(400).json({
        "error": msg
      });
    }
  }
  next();
}
