'use strict';

var AWS = require('aws-sdk');
AWS.config.region = 'eu-central-1';

var fs = require('fs');
var config = require('config');

var cdn = config.get("storage_cdn") 
var storage_endpoint = 'http://storage:9000';
const bucketName = "sdeck-fresh-development";
const ep = new AWS.Endpoint(storage_endpoint);
const s3 = new AWS.S3({
  endpoint: ep
});


module.exports = {
  removeFile: (path, callback) => {
    const s3 = new AWS.S3({
      region: 'eu-central-1'
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
      // FIXME
      var s3 = new AWS.S3({
        region: 'eu-central-1'
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
          const url = "https://"+ config.get("storage_cdn") + "/" + fileName;
          console.log("[s3]" + localFilePath + " to " + url);
          callback(null, url);
        }
      });
    });
  }
};
