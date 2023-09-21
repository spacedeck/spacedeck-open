"use strict";

var config = require('config');

var async = require('async');
var url = require("url");
var path = require("path");
var crypto = require('crypto');
var glob = require('glob');

var express = require('express');
var router = express.Router();

const db = require('../../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { v4: uuidv4 } = require('uuid');

router.get('/:membership_id/accept', function(req, res, next) {
  if (req.user) {
    db.Membership.findOne({where:{
      _id: req.params.membership_id,
      code: req.query.code
    }, include: ['space']}).then((mem) => {
      if (mem) {
        if (!mem.user) {
          mem.state = "active";
          mem.user_id = req.user._id;
          
          mem.save().then(function() {
            res.status(200).json(mem);
          });
        } else {
          res.status(200).json(mem);
        }
      } else {
        res.status(404).json({"error": "not found"});
      }
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
