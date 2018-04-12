'use strict';

const db = require('../models/db');
const config = require('config');
const phantom = require('node-phantom-simple');
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
        console.error("phantom abnormal exit for url "+space_url);
        if (!on_success_called && on_error) {
          on_error();
        }
      }
    };

    phantom.create({ path: require('phantomjs-prebuilt').path }, function (err, browser) {
      if (err) {
        console.error(err);
      } else {
        return browser.createPage(function (err, page) {
          console.log("page created, opening ",space_url);

          if (type=="pdf") {
            var psz = {
              width: space.width+"px",
              height: space.height+"px"
            };
            page.set('paperSize', psz);
          }

          page.set('settings.resourceTimeout',timeout);
          page.set('settings.javascriptEnabled',false);

          return page.open(space_url, function (err,status) {
            page.render(export_path, function() {
              on_success_called = true;
              if (on_success) {
                on_success(export_path);
              }
              page.close();
              browser.exit();
            });
          });
        });        
      }

    }, {
      onExit: on_exit
    });
  }
};
