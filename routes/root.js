"use strict";

const config = require('config');

const redis = require('../helpers/redis');
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const mailer = require('../helpers/mailer');
const _ = require('underscore');

const db = require('../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  res.render('index', { config:config, user:req.user });
});

router.get('/ping', (req, res) => {
  res.status(200).json({"status": "ok"})
});

router.get('/spaces', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

router.get('/not_found', (req, res) => {
  res.render('not_found', {});
});

router.get('/confirm/:token', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

router.get('/folders/:id', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

router.get('/signup', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

router.get('/accept/:id', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

router.get('/password-reset', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

router.get('/password-confirm/:token', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

router.get('/de/*', (req, res) => {
  res.redirect("/t/de");
});

router.get('/de', (req, res) => {
  res.redirect("/t/de");
});

router.get('/fr/*', (req, res) => {
  res.redirect("/t/fr");
});

router.get('/fr', (req, res) => {
  res.redirect("/t/fr");
});

router.get('/oc/*', (req, res) => {
  res.redirect("/t/oc");
});

router.get('/oc', (req, res) => {
  res.redirect("/t/oc");
});

router.get('/es/*', (req, res) => {
  res.redirect("/t/es");
});

router.get('/es', (req, res) => {
  res.redirect("/t/es");
});

router.get('/hu/*', (req, res) => {
  res.redirect("/t/hu");
});

router.get('/hu', (req, res) => {
  res.redirect("/t/hu");
});

router.get('/en/*', (req, res) => {
  res.redirect("/t/en");
});

router.get('/en', (req, res) => {
  res.redirect("/t/end");
});

router.get('/account', (req, res) => {
  res.render('spacedeck', { config:config });
});

router.get('/login', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

router.get('/logout', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

router.get('/t/:id', (req, res) => {
  res.cookie('spacedeck_locale', req.params.id, { maxAge: 900000, httpOnly: true });
  var path = "/";
  if (req.query.r=="login" || req.query.r=="signup") {
    path = "/"+req.query.r;
  }
  res.redirect(path);
});

router.get('/s/:hash', (req, res) => {
  var hash = req.params.hash;
  if (hash.split("-").length > 0) {
    hash = hash.split("-")[0];
  }

  db.Space.findOne({where: {"edit_hash": hash}}).then(function (space) {
    if (space) {
      if (req.accepts('text/html')){
	      res.redirect("/spaces/"+space._id + "?spaceAuth=" + hash);
      } else {
	      res.status(200).json(space);
      }
    } else {
      if (req.accepts('text/html')) {
	      res.status(404).render('not_found', {});
      } else {
	      res.status(404).json({});
      }
    }
  });
});

router.get('/spaces/:id', (req, res) => {
  res.render('spacedeck', { config:config, user:req.user });
});

module.exports = router;
