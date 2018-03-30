'use strict';

const exec = require('child_process');
const gm = require('gm');
const async = require('async');
const fs = require('fs');
const Models = require('../models/schema');
const uploader = require('../helpers/uploader');
const path = require('path');
const os = require('os');

const fileExtensionMap = {
  ".amr" : "audio/AMR",
  ".ogg" : "audio/ogg",
  ".aac" : "audio/aac",
  ".mp3" : "audio/mpeg",
  ".mpg" : "video/mpeg",
  ".3ga" : "audio/3ga",
  ".mp4" : "video/mp4",
  ".wav" : "audio/wav",
  ".mov" : "video/quicktime",
  ".doc" : "application/msword",
  ".dot" : "application/msword",
  ".docx" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".dotx" : "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  ".docm" : "application/vnd.ms-word.document.macroEnabled.12",
  ".dotm" : "application/vnd.ms-word.template.macroEnabled.12",
  ".xls" : "application/vnd.ms-excel",
  ".xlt" : "application/vnd.ms-excel",
  ".xla" : "application/vnd.ms-excel",
  ".xlsx" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xltx" : "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  ".xlsm" : "application/vnd.ms-excel.sheet.macroEnabled.12",
  ".xltm" : "application/vnd.ms-excel.template.macroEnabled.12",
  ".xlam" : "application/vnd.ms-excel.addin.macroEnabled.12",
  ".xlsb" : "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  ".ppt" : "application/vnd.ms-powerpoint",
  ".pot" : "application/vnd.ms-powerpoint",
  ".pps" : "application/vnd.ms-powerpoint",
  ".ppa" : "application/vnd.ms-powerpoint",
  ".pptx" : "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".potx" : "application/vnd.openxmlformats-officedocument.presentationml.template",
  ".ppsx" : "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  ".ppam" : "application/vnd.ms-powerpoint.addin.macroEnabled.12",
  ".pptm" : "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
  ".potm" : "application/vnd.ms-powerpoint.template.macroEnabled.12",
  ".ppsm" : "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
  ".key" : "application/x-iwork-keynote-sffkey",
  ".pages" : "application/x-iwork-pages-sffpages",
  ".numbers" : "application/x-iwork-numbers-sffnumbers",
  ".ttf" : "application/x-font-ttf"
};

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
  "audio/AMR",
  "audio/3ga",
  "audio/wav",
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


function getDuration(localFilePath, callback){
  exec.execFile("ffprobe", ["-show_format", "-of", "json", localFilePath], function(error, stdout, stderr) {
    var test = JSON.parse(stdout);
    callback(parseFloat(test.format.duration));
  });
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
      if(!error) {
        callback(null, filePathImage);
      } else {
        console.log("error:", stdout, stderr);
        callback(error, null);
      }
    });
  });
}

function convertVideo(fileName, filePath, codec, callback, progress_callback) {
  var ext = path.extname(fileName);
  var presetMime = fileExtensionMap[ext];

  var newExt = codec == "mp4" ? "mp4" : "ogv";
  var convertedPath = filePath + "." + newExt;

  console.log("converting", filePath, "to", convertedPath, "progress_cb:",progress_callback);

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
    if (progress_callback) {
      progress_callback(data);
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
  var presetMime = fileExtensionMap[ext];

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
  var presetMime = fileExtensionMap[ext];
  
  if (presetMime) {
    callback(null, presetMime);
  } else {
    exec.execFile("file", ["-b","--mime-type", filePath], {}, function(error, stdout, stderr) {
      console.log("file stdout: ",stdout);
      if (stderr === '' && error == null) {
        //filter special chars from commandline
        var mime = stdout.replace(/[^a-zA-Z0-9\/\-]/g,'');
        callback(null, mime);
      } else {
        console.log("getMime file error: ", error);
        callback(error, null);
      }
    });
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


var resizeAndUploadImage = function(a, mime, size, fileName, fileNameOrg, imageFilePath, originalFilePath, payloadCallback) {
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
      uploader.uploadFile(s3Key, mime, originalFilePath, function(err, url){
        callback(null, url);
      });
    }
  }, function(err, results) {
    a.state = "idle";
    a.mime = mime;
    var stats = fs.statSync(originalFilePath);

    a.payload_size = stats["size"];
    a.payload_thumbnail_web_uri = results.small;
    a.payload_thumbnail_medium_uri = results.medium;
    a.payload_thumbnail_big_uri = results.big;
    a.payload_uri = results.original;

    var factor = 320/size.width;
    var newBoardSpecs = a.board;
    newBoardSpecs.w = Math.round(size.width*factor);
    newBoardSpecs.h = Math.round(size.height*factor);
    a.board = newBoardSpecs;

    a.updated_at = new Date();
    a.save(function(err) {
      if(err) payloadCallback(err, null);
      else {
        fs.unlink(originalFilePath, function (err) {
          if (err){
            console.error(err);
            payloadCallback(err, null);
          } else {
            console.log('successfully deleted ' + originalFilePath);
            payloadCallback(null, a);
          }
        });
      }
    });
  });
};

module.exports = {
  convert: function(a, fileName, localFilePath, payloadCallback, progress_callback) {
    getMime(fileName, localFilePath, function(err, mime){
      console.log("[convert] fn: "+fileName+" local: "+localFilePath+" mime:", mime);

      if (!err) {
        if (convertableImageTypes.indexOf(mime) > -1) {
         
          gm(localFilePath).size(function (err, size) {
            console.log("[convert] gm:", err, size);

            if (!err) {
              if(mime == "application/pdf") {
                var firstImagePath =  localFilePath + ".jpeg";
                exec.execFile("gs", ["-sDEVICE=jpeg","-dNOPAUSE", "-dJPEGQ=80", "-dBATCH", "-dFirstPage=1", "-dLastPage=1", "-sOutputFile=" + firstImagePath, "-r90", "-f", localFilePath], {}, function(error, stdout, stderr) {
                  if(error === null) {
                    resizeAndUploadImage(a, mime, size, fileName + ".jpeg", fileName, firstImagePath, localFilePath, function(err, a) {
                      fs.unlink(firstImagePath, function (err) {
                        payloadCallback(err, a);
                      });
                    });
                  } else {
                    payloadCallback(error, null);
                  }
                });

              } else if(mime == "image/gif") {
                //gifs are buggy after convertion, so we should not convert them

                var s3Key = "s"+ a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName;

                uploader.uploadFile(s3Key, "image/gif", localFilePath, function(err, url) {
                  if(err)callback(err);
                  else{
                    console.log(localFilePath);
                    var stats = fs.statSync(localFilePath);

                    a.state = "idle";
                    a.mime = mime;

                    a.payload_size = stats["size"];
                    a.payload_thumbnail_web_uri = url;
                    a.payload_thumbnail_medium_uri = url;
                    a.payload_thumbnail_big_uri = url;
                    a.payload_uri = url;

                    var factor = 320/size.width;
                    var newBoardSpecs = a.board;
                    newBoardSpecs.w = Math.round(size.width*factor);
                    newBoardSpecs.h = Math.round(size.height*factor);
                    a.board = newBoardSpecs;

                    a.updated_at = new Date();
                    a.save(function(err){
                      if(err) payloadCallback(err, null);
                      else {
                        fs.unlink(localFilePath, function (err) {
                          if (err){
                            console.error(err);
                            payloadCallback(err, null);
                          } else {
                            console.log('successfully deleted ' + localFilePath);
                            payloadCallback(null, a);
                          }
                        });
                      }
                    });
                  }
                });

              } else {
                resizeAndUploadImage(a, mime, size, fileName, fileName, localFilePath, localFilePath, payloadCallback);
              }
            } else payloadCallback(err);
          });            
      
        } else if (convertableVideoTypes.indexOf(mime) > -1) {
          async.parallel({
            thumbnail: function(callback) {
              createThumbnailForVideo(fileName, localFilePath, function(err, created){
                console.log("thumbnail created: ", err, created);
                if(err) callback(err);
                else{
                  var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName + ".jpg" ;
                  uploader.uploadFile(keyName, "image/jpeg", created, function(err, url){
                    if (err) callback(err);
                    else callback(null, url);
                  });
                }
              });
            },
            ogg: function(callback) {
              if (mime == "video/ogg") {
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
                }, progress_callback);
              }
            },
            mp4: function(callback) {
              if (mime == "video/mp4") {
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
                }, progress_callback);
              }
            },
            original: function(callback){
              uploader.uploadFile(fileName, mime, localFilePath, function(err, url){
                callback(null, url);
              });
            }
          }, function(err, results){
            console.log(err, results);

            if (err) payloadCallback(err, a);
            else {
              a.state = "idle";
              a.mime = mime;
              var stats = fs.statSync(localFilePath);

              a.payload_size = stats["size"];
              a.payload_thumbnail_web_uri = results.thumbnail;
              a.payload_thumbnail_medium_uri = results.thumbnail;
              a.payload_thumbnail_big_uri = results.thumbnail;
              a.payload_uri = results.original;

              if (mime == "video/mp4") {
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

              a.updated_at = new Date();
              a.save(function(err) {
                if (err) payloadCallback(err, null);
                else {
                  fs.unlink(localFilePath, function (err) {
                    if (err){
                      console.error(err);
                      payloadCallback(err, null);
                    } else {
                      console.log('successfully deleted ' + localFilePath);
                      payloadCallback(null, a);
                    }
                  });
                }
              });
            }
          });

        } else if (convertableAudioTypes.indexOf(mime) > -1) {

          async.parallel({
            ogg: function(callback) {
              convertAudio(fileName, localFilePath, "ogg", function(err, file) {
                if(err) callback(err);
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
                if(err) callback(err);
                else {

                  createWaveform(fileName, file, function(err, filePath){

                    var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName + "-" + (new Date().getTime()) + ".png";
                    uploader.uploadFile(keyName, "image/png", filePath, function(err, pngUrl){

                      var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName + ".mp3" ;
                      uploader.uploadFile(keyName, "audio/mp3", file, function(err, mp3Url){
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
              uploader.uploadFile(keyName, mime, localFilePath, function(err, url){
                callback(null, url);
              });
            }
          }, function(err, results) {
            console.log(err, results);

            if (err) payloadCallback(err, a);
            else {

              a.state = "idle";
              a.mime = mime;
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
              a.save(function(err){
                if(err) payloadCallback(err, null);
                else {
                  fs.unlink(localFilePath, function (err) {
                    if (err){
                      console.error(err);
                      payloadCallback(err, null);
                    } else {
                      console.log('successfully deleted ' + localFilePath);
                      payloadCallback(null, a);
                    }
                  });
                }
              });
            }
          });


        } else {
          console.log("mime not matched for conversion, storing file");
          var keyName = "s" + a.space_id.toString() + "/a" + a._id.toString() + "/" + fileName;
          uploader.uploadFile(keyName, mime, localFilePath, function(err, url) {
            
            a.state = "idle";
            a.mime = mime;
            var stats = fs.statSync(localFilePath);
            a.payload_size = stats["size"];
            a.payload_uri = url;
            
            a.updated_at = new Date();
            a.save(function(err) {
              if(err) payloadCallback(err, null);
              else {
                fs.unlink(localFilePath, function (err) {
                  payloadCallback(null, a);
                });
              }
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


