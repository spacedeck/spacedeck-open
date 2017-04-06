'use strict';

require('../models/schema');
var config = require('config');

module.exports = (req, res, next) => {
  var artifactId = req.params.artifact_id;
  Artifact.findOne({
    "_id": artifactId
  }, (err, artifact) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (artifact) {
        req['artifact'] = artifact;
        next();
      } else {
        res.sendStatus(404);
      }
    }
  });
};