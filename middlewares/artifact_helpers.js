'use strict';
const db = require('../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var config = require('config');

module.exports = (req, res, next) => {
  var artifactId = req.params.artifact_id;
  db.Artifact.findOne({where: {
    "_id": artifactId
  }}).then(artifact => {
    if (artifact) {
      req['artifact'] = artifact;
      next();
    } else {
      res.sendStatus(404);
    }
  });
};
