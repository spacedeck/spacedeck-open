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

    space_url += "?api_token="+config.get("export_api_secret");

    console.log("[space-screenshot] url: "+space_url);
    console.log("[space-screenshot] export_path: "+export_path);

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
        await page.goto(space_url, {waitUntil: 'networkidle2'});
        await page.emulateMediaType('screen');

        if (type=="pdf") {
          let margin = 2;
          await page.pdf({path: export_path, printBackground: true, width: space.width+margin+'px', height: space.height+margin+'px' });
        }else{
          await page.screenshot({path: export_path, printBackground: true});
        }

        await browser.close();
        on_success(export_path);
      } catch (error) {
        console.error(error);
        console.error("[space-screenshot] puppeteer abnormal exit for url "+space_url);
        on_error();
      }
    
    })();
  }
};
