"use strict";

var config = require('config');
require('../../models/schema');

var fs = require('fs');
var _ = require("underscore");
var mongoose = require("mongoose");
var async = require('async');
var archiver = require('archiver');
var request = require('request');
var url = require("url");
var path = require("path");
var crypto = require('crypto');
var qr = require('qr-image');
var glob = require('glob');
var gm = require('gm');

var express = require('express');
var router = express.Router();

var userMapping = { '_id': 1, 'nickname': 1, 'email': 1};
var spaceMapping = { '_id': 1, name: 1};

router.get('/:membership_id/accept', function(req, res, next) {
  if (req.user) {
    Membership.findOne({
      _id: req.params.membership_id,
      state: "pending",
      code: req.query.code,
      user: { "$exists": false }
    }).populate('space').exec((err,mem) => {
      if (err) res.sendStatus(400);
      else {
        if (mem) {
          if(!mem.user) {          
            mem.code = null;
            mem.state = "active";
            mem.user = req.user;
            
            mem.save(function(err){
              if (err) res.status(400).json(err);
              else {
                console.log(mem);
                res.status(200).json(mem);
              }
            });
          } else {
            res.status(400).json({"error": "already_used"});
          }
        } else {
          res.status(404).json({"error": "not found"});
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
