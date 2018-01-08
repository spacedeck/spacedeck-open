'use strict';

var fs = require('fs');
var config = require('config');

// use AWS S3 or local folder depending on config
if (config.get("storage_local_path")) {
  var AWS = require('mock-aws-s3');
  AWS.config.basePath = config.get("storage_local_path");
} else {
  var AWS = require('aws-sdk');
  AWS.config.region = config.get("storage_region");
}

module.exports = {
  removeFile: (path, callback) => {
    const s3 = new AWS.S3({
      region: config.get("storage_region")
    });
    const bucket = config.get("storage_bucket");
    s3.deleteObject({
      Bucket: bucket, Key: path
    }, (err, res) => {
      if (err){
        console.error(err);
        callback(err);
      }else {
        callback(null, res);
      }
    });
  },
  uploadFile: function(fileName, mime, localFilePath, callback) {
    if (typeof(localFilePath)!="string") {
      callback({error:"missing path"}, null);
      return;
    }
    console.log("[s3] uploading", localFilePath, " to ", fileName);

    const bucket = config.get("storage_bucket");
    const fileStream = fs.createReadStream(localFilePath);
    fileStream.on('error', function (err) {
      if (err) {
        console.error(err);
        callback(err);
      }
    });
    fileStream.on('open', function () {
      var s3 = new AWS.S3({
        region: config.get("storage_region")
      });

      s3.putObject({
        Bucket: bucket,
        Key: fileName,
        ContentType: mime,
        Body: fileStream
      }, function (err) {
        if (err){
          console.error(err);
          callback(err);
        }else {
          const url = config.get("storage_cdn") + "/" + fileName;
          console.log("[s3]" + localFilePath + " to " + url);
          callback(null, url);
        }
      });
    });
  }
};
