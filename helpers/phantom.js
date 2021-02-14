'use strict';

const db = require('../models/db');
const config = require('config');
const puppeteer = require('puppeteer');
const os = require('os');

module.exports = {
  // type = "pdf" or "png"
  takeScreenshot: function(space,type,on_success,on_error) {
    var spaceId = space._id;
    var space_url = config.get("endpoint")+"/api/spaces/"+spaceId+"/html";

    var export_path = os.tmpdir()+"/"+spaceId+"."+type;

    var timeout = 5000;
    if (type=="pdf") timeout = 30000;

    space_url += "?api_token="+config.get("phantom_api_secret");

    console.log("[space-screenshot] url: "+space_url);
    console.log("[space-screenshot] export_path: "+export_path);

    var on_success_called = false;

    var on_exit = function(exit_code) {
      if (exit_code>0) {
        console.error(exit_code);
        console.error("puppeteer abnormal exit for url "+space_url);
        if (!on_success_called && on_error) {
          on_error();
        }
      }
    };

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

        console.log("page created, opening ",space_url);
        await page.goto(space_url, {waitUntil: 'networkidle0'});

        if (type=="pdf") {
          await page.pdf({path: export_path, width: space.width+'px', height: space.height+'px' });
        }else{
          await page.screenshot({path: export_path});
        }

        await browser.close();
        on_success(export_path);
      } catch (error) {
        on_error();
      }
    
    })();
  }
};
