'use strict';

var AWS = require('aws-sdk');
AWS.config.region = 'eu-central-1';

var fs = require('fs');
var config = require('config');

var cdn = config.get("storage_cdn");
var storage_endpoint = config.get("storage_endpoint");

const bucketName = "sdeck-fresh-development";
const ep = new AWS.Endpoint(storage_endpoint);

AWS.config.update(new AWS.Config({
  accessKeyId: process.env.MINIO_ACCESS_KEY, 
  secretAccessKey: process.env.MINIO_SECRET_KEY, 
  region: 'us-east-1',
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
}));

const s3 = new AWS.S3({
  endpoint: ep
});

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
        }else {
          const url = cdn + "/" + fileName;
          console.log("[s3]" + localFilePath + " to " + url);
          callback(null, url);
        }
      });
    });
  }
};
