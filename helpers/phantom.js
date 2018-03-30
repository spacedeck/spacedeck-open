'use strict';

require('../models/schema');
var config = require('config');
var phantom = require('node-phantom-simple');

module.exports = {
  // type = "pdf" or "png"
  takeScreenshot: function(space,type,on_success,on_error) {
    var spaceId = space._id;
    var space_url = config.get("endpoint")+"/api/spaces/"+spaceId+"/html";

    var export_path = "/tmp/"+spaceId+"."+type;

    var timeout = 5000;
    if (type=="pdf") timeout = 30000;

    space_url += "?api_token="+config.get("phantom_api_secret");

    console.log("[space-screenshot] url: "+space_url);
    console.log("[space-screenshot] export_path: "+export_path);

    var on_success_called = false;

    var on_exit = function(exit_code) {
      if (exit_code>0) {
        console.log("phantom abnormal exit for url "+space_url);
        if (!on_success_called && on_error) {
          on_error();
        }
      }
    };

    phantom.create({ path: require('phantomjs-prebuilt').path }, function (err, browser) {
      if(err){
        console.log(err);
      }else{
        return browser.createPage(function (err, page) {
          console.log("page created, opening ",space_url);

          if (type=="pdf") {
            var psz = {
              width: space.advanced.width+"px",
              height: space.advanced.height+"px"
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
