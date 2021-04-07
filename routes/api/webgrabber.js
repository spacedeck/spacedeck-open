"use strict";

const puppeteer = require('puppeteer');

var config = require('config');
require('../../models/db');
var fs = require('fs');
var md5 = require('md5');

var express = require('express');
var router = express.Router();

function website_to_png(url,on_success,on_error) {
  var hash = md5(url);
  var export_path = "/tmp/webgrabber-"+hash+".png";

  var timeout = 2000;

  console.log("[webgrabber] url: "+url);
  console.log("[webgrabber] export_path: "+export_path);

  fs.stat(export_path, function(err, stat) {
    if (!err) {
      // file exists
      console.log("[webgrabber] serving cached snapshot of url: "+url);
      on_success(export_path);
    } else {
      (async () => {
        let browser;
        let page;
        try {
          browser = await puppeteer.launch(
            {
              headless: true,
              args: ['--disable-dev-shm-usage', '--no-sandbox']
            }
          );
          page = await browser.newPage();
  
          page.setDefaultTimeout(timeout);
          await page.setJavaScriptEnabled(false);
          await page.goto(url, {waitUntil: 'networkidle2'});
          await page.emulateMedia('screen');
          await page.screenshot({path: export_path, printBackground: true});
  
          await browser.close();
          on_success(export_path);
        } catch (error) {
          console.error(error);
          console.log("[webgrabber] puppeteer abnormal exit for url "+url);
          on_error();
        }
      
      })();
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
