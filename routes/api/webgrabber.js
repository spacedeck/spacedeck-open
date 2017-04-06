"use strict";

var config = require('config');
require('../../models/schema');

var fs = require('fs');
var phantom = require('node-phantom-simple');
var md5 = require('md5');

var express = require('express');
var router = express.Router();

function website_to_png(url,on_success,on_error) {
  var hash = md5(url);
  var export_path = "/tmp/webgrabber-"+hash+".png";

  var timeout = 2000;

  console.log("[webgrabber] url: "+url);
  console.log("[webgrabber] export_path: "+export_path);

  var on_success_called = false;

  var on_exit = function(exit_code) {
    if (exit_code>0) {
      console.log("[phantom-webgrabber] abnormal exit for url "+url);
      if (!on_success_called && on_error) {
        on_error();
      }
    }
  };
  
  fs.stat(export_path, function(err, stat) {
    if (!err) {
      // file exists
      console.log("[webgrabber] serving cached snapshot of url: "+url);
      on_success(export_path);
    } else {
      phantom.create({ path: require('phantomjs-prebuilt').path }, function (err, browser) {
        return browser.createPage(function (err, page) {
          page.set('settings.resourceTimeout',timeout);
          page.set('settings.javascriptEnabled',false);
          
          return page.open(url, function(err, status) {
            console.log("[webgrabber] status: "+status);
            page.render(export_path, function() {
              on_success_called = true;
              on_success(export_path);
              browser.exit();
            });
          });
        });
      }, {
        onExit: on_exit
      });
    }
  });
}

router.get('/:id', function (req, res) {
  var uri = new Buffer(req.params.id, "base64")+"";
  var on_success_called = false;

  website_to_png(uri, (image_path) => {
    on_success_called = true;
    res.sendFile(image_path);
  }, () => {
    if (!on_success_called) {
      res.status(500).send("[webgrabber] Error fetching website.");
    }
  });
});

module.exports = router;
