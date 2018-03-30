'use strict';

var fs = require('fs');
var config = require('config');
var s3 = null;

// use AWS S3 or local folder depending on config
if (config.get("storage_local_path")) {
  var AWS = require('mock-aws-s3');
  AWS.config.basePath = config.get("storage_local_path");
  s3 = new AWS.S3();
} else {
  var AWS = require('aws-sdk');
  var storage_endpoint = config.get("storage_endpoint");
  const ep = new AWS.Endpoint(storage_endpoint);

  AWS.config.update(new AWS.Config({
    accessKeyId: process.env.MINIO_ACCESS_KEY, 
    secretAccessKey: process.env.MINIO_SECRET_KEY, 
    region: config.get("storage_region"),
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  }));
  s3 = new AWS.S3({
    endpoint: ep
  });
}

s3.createBucket({
  Bucket: config.get("storage_bucket"),
  ACL: "public-read",
  GrantRead: "*"
}, (err,res) => {
  console.log("createBucket",err,res);
});

module.exports = {
  removeFile: (path, callback) => {
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
    console.log("[storage] uploading", localFilePath, " to ", fileName);

    const bucket = config.get("storage_bucket");
    const fileStream = fs.createReadStream(localFilePath);
    fileStream.on('error', function (err) {
      if (err) {
        console.error(err);
        callback(err);
      }
    });
    fileStream.on('open', function () {
      s3.putObject({
        Bucket: bucket,
        Key: fileName,
        ContentType: mime,
        Body: fileStream
      }, function (err) {
        if (err){
          console.error(err);
          callback(err);
        } else {
          const url = config.get("storage_cdn") + "/" + fileName;
          console.log("[s3]" + localFilePath + " to " + url);
          callback(null, url);
        }
      });
    });
  }
};
