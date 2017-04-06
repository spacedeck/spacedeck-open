'use strict';

module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}