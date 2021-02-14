'use strict';

const exec = require('child_process');
const gm = require('gm');
const async = require('async');
const fs = require('fs');
const Models = require('../models/db');
const uploader = require('../helpers/uploader');
const path = require('path');
const os = require('os');

const db = require('../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const mime = require('mime-types');
const fileType = require('file-type');
const readChunk = require('read-chunk');

const convertableImageTypes = [
  "image/png",
  "image/jpeg",
  "application/pdf",
  "image/jpg",
  "image/gif",
  "image/tiff",
  "image/vnd.adobe.photoshop"];

const convertableVideoTypes = [
  "video/quicktime",
  "video/3gpp",
  "video/mpeg",
  "video/mp4",
  "video/ogg"];

const convertableAudioTypes = [
  "application/ogg",
  "audio/amr",
  "audio/3ga",
  "audio/wave",
  "audio/3gpp",
  "audio/x-wav",
  "audio/aiff",
  "audio/x-aiff",
  "audio/ogg",
  "audio/mp4",
  "audio/x-m4a",
  "audio/mpeg",
  "audio/mp3",
  "audio/x-hx-aac-adts",
  "audio/aac"];

// ffmpeg progress
var duration = 0, time = 0, progress = 0;

function getDuration(localFilePath, callback){
  exec.execFile("ffprobe", ["-show_format", "-of", "json", localFilePath], function(error, stdout, stderr) {
    var test = JSON.parse(stdout);
    callback(parseFloat(test.format.duration));
  });
}

function getConversionProgress(content){
  // get duration of source
  var matches = (content) ? content.match(/Duration: (.*?), start:/) : [];
  if( matches && matches.length>0 ){
    var rawDuration = matches[1];
    // convert rawDuration from 00:00:00.00 to seconds.
    var ar = rawDuration.split(":").reverse();
    duration = parseFloat(ar[0]);
    if (ar[1]) duration += parseInt(ar[1]) * 60;
    if (ar[2]) duration += parseInt(ar[2]) * 60 * 60;
  } 
  // get the time 
  matches = content.match(/time=(.*?) bitrate/g);
  if( matches && matches.length>0 ){
    var rawTime = matches.pop();
    // needed if there is more than one match
    if (Array.isArray(rawTime)){ 
        rawTime = rawTime.pop().replace('time=','').replace(' bitrate',''); 
    } else {
        rawTime = rawTime.replace('time=','').replace(' bitrate','');
    }

    // convert rawTime from 00:00:00.00 to seconds.
    ar = rawTime.split(":").reverse();
    time = parseFloat(ar[0]);
    if (ar[1]) time += parseInt(ar[1]) * 60;
    if (ar[2]) time += parseInt(ar[2]) * 60 * 60;

    //calculate the progress
    progress = Math.round((time/duration) * 100);
  }
  return progress;
}

function createWaveform(fileName, localFilePath, callback){
  var filePathImage = localFilePath + "-" + (new Date().getTime()) + ".png";

  getDuration(localFilePath, function(duration){
    var totalTime = duration || 1.0;
    var pixelsPerSecond = 256.0;
    do {
      var targetWidth = parseInt(pixelsPerSecond*totalTime, 10);
      if (targetWidth>2048) pixelsPerSecond/=2.0;
    } while (targetWidth>2048 && pixelsPerSecond>1);

    exec.execFile("audiowaveform",
      [
        "-w",
        ""+targetWidth,
        "--pixels-per-second",
        ""+parseInt(pixelsPerSecond),
        "--background-color", "ffffff00",
        "--border-color", "ffffff",
        "--waveform-color", "3498db",
        "--no-axis-labels",
        "-i", localFilePath, "-o", filePathImage
      ],
    {}, function(error, stdout, stderr) {
      if (!error) {
        callback(null, filePathImage);
      } else {
        console.log("error:", stdout, stderr);
        callback(error, null);
      }
    });
  });
}

function convertVideo(fileName, filePath, codec, callback, progressCallback) {
  var ext = path.extname(fileName);
  var presetMime = mime.lookup(fileName);

  var newExt = codec == "mp4" ? "mp4" : "ogv";
  var convertedPath = filePath + "." + newExt;

  console.log("convertVideo", filePath, "to", convertedPath);

  var convertArgs = (codec == "mp4") ? [
    "-i", filePath,
    "-threads", "4",
    "-vf", "scale=1280:trunc(ow/a/2)*2", // scale to width of 1280, truncating height to an even value
    "-b:v", "2000k",
    "-acodec", "libvo_aacenc",
    "-b:a", "96k",
    "-vcodec", "libx264",
    "-y", convertedPath ]
  : [
    "-i", filePath,
    "-threads", "4",
    "-vf", "scale=1280:trunc(ow/a/2)*2", // scale to width of 1280, truncating height to an even value
    "-b:v", "2000k",
    "-acodec", "libvorbis",
    "-b:a", "96k",
    "-vcodec", "libtheora",
    "-y", convertedPath];

  var ff = exec.spawn('ffmpeg', convertArgs, {
    stdio: [
      'pipe', // use parents stdin for child
      'pipe', // pipe child's stdout to parent
      'pipe'
    ]
  });

  ff.stdout.on('data', function (data) {
    console.log('[ffmpeg-video] stdout: ' + data);
  });

  ff.stderr.on('data', function (data) {
    console.log('[ffmpeg-video] stderr: ' + data);
    if (progressCallback) {
      progressCallback(getConversionProgress(""+data)+"%");
    }
  });

  ff.on('close', function (code) {
    console.log('[ffmpeg-video] child process exited with code ' + code);
    if (!code) {
      console.log("converted", filePath, "to", convertedPath);
      callback(null, convertedPath);
    } else {
      callback(code, null);
    }
  });
}

function convertAudio(fileName, filePath, codec, callback) {
  var ext = path.extname(fileName);
  var presetMime = mime.lookup(fileName);

  var newExt = codec == "mp3" ? "mp3" : "ogg";
  var convertedPath = filePath + "." + newExt;

  console.log("converting audio", filePath, "to", convertedPath);

  var convertArgs = (ext == ".aac") ? [ "-i", filePath, "-y", convertedPath ]
  : [ "-i", filePath,
    "-b:a", "128k",
    "-y", convertedPath];

  exec.execFile("ffmpeg", convertArgs , {}, function(error, stdout, stderr) {
    if(!error){
      console.log("converted", filePath, "to", convertedPath);
      callback(null, convertedPath);
    }else{
      console.log(error,stdout, stderr);
      callback(error, null);
    }
  });
}

function createThumbnailForVideo(fileName, filePath, callback) {
  var filePathImage = filePath + ".jpg";
  exec.execFile("ffmpeg", ["-y", "-i", filePath, "-ss", "00:00:01.00", "-vcodec", "mjpeg", "-vframes", "1", "-f", "image2", filePathImage], {}, function(error, stdout, stderr){
    if(!error){
      callback(null, filePathImage);
    }else{
      console.log("error:", stdout, stderr);
      callback(error, null);
    }
  });
}

function getMime(fileName, filePath, callback) {
  var ext = path.extname(fileName);
  var presetMime = mime.lookup(fileName);

  if (presetMime) {
    callback(null, presetMime);
  } else {
    const buffer = readChunk.sync(filePath, 0, 4100);
    var mimeType = fileType(buffer);
    callback(null, mimeType);
  }
}

function resizeAndUpload(a, size, max, fileName, localFilePath, callback) {
  if (max>320 || size.width > max || size.height > max) {
    var resizedFileName = max + "_"+fileName;
    var s3Key = "s"+ a.space_id.toString() + "/a" + a._id.toString() + "/" + resizedFileName;
    var localResizedFilePath = os.tmpdir()+"/"+resizedFileName;
    gm(localFilePath).resize(max, max).autoOrient().write(localResizedFilePath, function (err) {
      if(!err) {
        uploader.uploadFile(s3Key, "image/jpeg", localResizedFilePath, function(err, url) {
          if (err) callback(err);
          else{
            fs.unlink(localResizedFilePath, function (err) {
              if (err) {
                console.error(err);
                callback(null, url);
              }
              else callback(null, url);
            });
          }
        });
      } else {
        console.error(err);
        callback(err);
      }
    });
  } else {
    callback(null, "");
  }
}

var resizeAndUploadImage = function(a, mimeType, size, fileName, fileNameOrg, imageFilePath, originalFilePath, payloadCallback) {
  async.parallel({
    small: function(callback){
      resizeAndUpload(a, size, 320, fileName, imageFilePath, callback);
    },
    medium: function(callback){
      resizeAndUpload(a, size, 800, fileName, imageFilePath, callback);
    },
    big: function(callback){
      resizeAndUpload(a, size, 1920, fileName, imageFilePath, callback);
    },
    original: function(callback){
      var s3Key = "s"+ a.space_id.toString() + "/a" + a._id + "/" + fileNameOrg;
      uploader.uploadFile(s3Key, mimeType, originalFilePath, function(err, url){
        callback(null, url);
      });
    }
  }, function(err, results) {
    a.state = "idle";
    a.mime = mimeType;
    var stats = fs.statSync(originalFilePath);

    a.payload_size = stats["size"];
    a.payload_thumbnail_web_uri = results.small;
    a.payload_thumbnail_medium_uri = results.medium;
    a.payload_thumbnail_big_uri = results.big;
    a.payload_uri = results.original;

    var factor = 320/size.width;
    a.w = Math.round(size.width*factor);
    a.h = Math.round(size.height*factor);

    a.updated_at = new Date();
    db.packArtifact(a);

    a.save().then(function() {
      fs.unlink(originalFilePath, function (err) {
        if (err){
          console.error(err);
          payloadCallback(err, null);
        } else {
          console.log('successfully deleted ' + originalFilePath);
          payloadCallback(null, a);
        }
      });
    });
  });
};

module.exports = {
  convert: function(a, fileName, localFilePath, payloadCallback, progressCallback) {
    getMime(fileName, localFilePath, function(err, mimeType) {
      console.log("[convert] fn: "+fileName+" local: "+localFilePath+" mimeType:", mimeType);

      if (!err) {
        if (convertableImageTypes.indexOf(mimeType) > -1) {

          gm(localFilePath).size(function (err, size) {
            console.log("[convert] gm:", err, size);

            if (!err) {
              if (mimeType == "application/pdf") {
                var firstImagePath =  localFilePath + ".jpeg";
                exec.execFile("gs", ["-sDEVICE=jpeg","-dNOPAUSE", "-dJPEGQ=80", "-dBATCH", "-dFirstPage=1", "-dLastPage=1", "-sOutputFile=" + firstImagePath, "-r90", "-f", localFilePath], {}, function(error, stdout, stderr) {
                  if(error === null) {
                    resizeAndUploadImage(a, mimeType, size, fileName + ".jpeg", fileName, firstImagePath, localFilePath, function(err, a) {
                      fs.unlink(firstImagePath, function (err) {
                        payloadCallback(err, a);
                      });
                    });
                  } else {
                    payloadCallback(error, null);
                  }
                });

              } else if (mimeType == "image/gif") {
                //gifs are buggy after convertion, so we should not convert them

                var s3Key = "s"+ a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName;

                uploader.uploadFile(s3Key, "image/gif", localFilePath, function(err, url) {
                  if (err) payloadCallback(err);
                  else {
                    console.log(localFilePath);
                    var stats = fs.statSync(localFilePath);

                    a.state = "idle";
                    a.mime = mimeType;

                    a.payload_size = stats["size"];
                    a.payload_thumbnail_web_uri = url;
                    a.payload_thumbnail_medium_uri = url;
                    a.payload_thumbnail_big_uri = url;
                    a.payload_uri = url;

                    var factor = 320/size.width;
                    a.w = Math.round(size.width*factor);
                    a.h = Math.round(size.height*factor);

                    a.updated_at = new Date();
                    db.packArtifact(a);

                    a.save().then(function() {
                      fs.unlink(localFilePath, function (err) {
                        if (err) {
                          console.error(err);
                          payloadCallback(err, null);
                        } else {
                          console.log('successfully deleted ' + localFilePath);
                          payloadCallback(null, a);
                        }
                      });
                    });
                  }
                });

              } else {
                resizeAndUploadImage(a, mimeType, size, fileName, fileName, localFilePath, localFilePath, payloadCallback);
              }
            } else payloadCallback(err);
          });

        } else if (convertableVideoTypes.indexOf(mimeType) > -1) {
          async.parallel({
            thumbnail: function(callback) {
              createThumbnailForVideo(fileName, localFilePath, function(err, created){
                console.log("thumbnail created: ", err, created);
                if (err) callback(err);
                else {
                  var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName + ".jpg" ;
                  uploader.uploadFile(keyName, "image/jpeg", created, function(err, url){
                    if (err) callback(err);
                    else callback(null, url);
                  });
                }
              });
            },
            ogg: function(callback) {
              if (mimeType == "video/ogg") {
                callback(null, "org");
              } else {
                convertVideo(fileName, localFilePath, "ogg", function(err, file) {
                  if(err) callback(err);
                  else {
                    var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName + ".ogv" ;
                    uploader.uploadFile(keyName, "video/ogg", file, function(err, url){
                      if (err) callback(err);
                      else callback(null, url);
                    });
                  }
                }, progressCallback);
              }
            },
            mp4: function(callback) {
              if (mimeType == "video/mp4") {
                callback(null, "org");
              } else {
                convertVideo(fileName, localFilePath, "mp4", function(err, file) {
                  if (err) callback(err);
                  else {
                    var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName + ".mp4";
                    uploader.uploadFile(keyName, "video/mp4" ,file, function(err, url) {
                      if (err) callback(err);
                      else callback(null, url);
                    });
                  }
                }, progressCallback);
              }
            },
            original: function(callback){
              uploader.uploadFile(fileName, mimeType, localFilePath, function(err, url){
                callback(null, url);
              });
            }
          }, function(err, results) {
            console.log(err, results);

            if (err) payloadCallback(err, a);
            else {
              a.state = "idle";
              a.mime = mimeType;
              var stats = fs.statSync(localFilePath);

              a.payload_size = stats["size"];
              a.payload_thumbnail_web_uri = results.thumbnail;
              a.payload_thumbnail_medium_uri = results.thumbnail;
              a.payload_thumbnail_big_uri = results.thumbnail;
              a.payload_uri = results.original;

              if (mimeType == "video/mp4") {
                a.payload_alternatives = [
                  {
                    mime: "video/ogg",
                    payload_uri: results.ogg
                  }
                ];
              } else {
                a.payload_alternatives = [
                  {
                    mime: "video/mp4",
                    payload_uri: results.mp4
                  }
                ];
              }

              db.packArtifact(a);

              a.updated_at = new Date();
              a.save().then(function() {
                fs.unlink(localFilePath, function (err) {
                  if (err) {
                    console.error(err);
                    payloadCallback(err, null);
                  } else {
                    console.log('successfully deleted ' + localFilePath);
                    payloadCallback(null, a);
                  }
                });
              });
            }
          });

        } else if (convertableAudioTypes.indexOf(mimeType) > -1) {
          async.parallel({
            ogg: function(callback) {
              convertAudio(fileName, localFilePath, "ogg", function(err, file) {
                if (err) callback(err);
                else {
                  var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName + ".ogg" ;
                  uploader.uploadFile(keyName, "audio/ogg", file, function(err, url){
                    if (err) callback(err);
                    else callback(null, url);
                  });
                }
              });
            },
            mp3_waveform: function(callback) {
              convertAudio(fileName, localFilePath, "mp3", function(err, file) {
                if (err) callback(err);
                else {
                  createWaveform(fileName, file, function(err, filePath) {
                    var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName + "-" + (new Date().getTime()) + ".png";
                    uploader.uploadFile(keyName, "image/png", filePath, function(err, pngUrl) {
                      var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName + ".mp3" ;
                      uploader.uploadFile(keyName, "audio/mp3", file, function(err, mp3Url) {
                        if (err) callback(err);
                        else callback(null, {waveform: pngUrl, mp3: mp3Url});
                      });
                    });
                  });
                }
              });
            },
            original: function(callback) {
              var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName;
              uploader.uploadFile(keyName, mimeType, localFilePath, function(err, url) {
                callback(null, url);
              });
            }
          }, function(err, results) {
            console.log(err, results);

            if (err) payloadCallback(err, a);
            else {
              a.state = "idle";
              a.mime = mimeType;
              var stats = fs.statSync(localFilePath);

              a.payload_size = stats["size"];
              a.payload_thumbnail_web_uri = results.mp3_waveform.waveform;
              a.payload_thumbnail_medium_uri = results.mp3_waveform.waveform;
              a.payload_thumbnail_big_uri = results.mp3_waveform.waveform;
              a.payload_uri = results.original;
              a.payload_alternatives = [
                {payload_uri:results.ogg, mime:"audio/ogg"},
                {payload_uri:results.mp3_waveform.mp3, mime:"audio/mpeg"}
              ];

              a.updated_at = new Date();
              db.packArtifact(a);

              a.save().then(function() {
                fs.unlink(localFilePath, function (err) {
                  if (err){
                    console.error(err);
                    payloadCallback(err, null);
                  } else {
                    console.log('successfully deleted ' + localFilePath);
                    payloadCallback(null, a);
                  }
                });
              });
            }
          });


        } else {
          console.log("mimeType not matched for conversion, storing file");
          var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName;
          uploader.uploadFile(keyName, mimeType, localFilePath, function(err, url) {

            a.state = "idle";
            a.mime = mimeType;
            var stats = fs.statSync(localFilePath);
            a.payload_size = stats["size"];
            a.payload_uri = url;

            a.updated_at = new Date();
            a.save().then(function() {
              fs.unlink(localFilePath, function (err) {
                payloadCallback(null, a);
              });
            });
          });
        }
      } else {
        //there was an error getting mime
        payloadCallback(err);
      }
    });
  }
};
