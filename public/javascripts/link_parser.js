function parse_link(data) {
  if (data == null) {
    return "";
  }

  var html = data;
  var recommendedWidth = 400;
  var recommendedHeight = 300;
  var extraViewClasses = "";
  var sourceLink = null;
  var plainText = false;
  var genericEmbedMatcher = /embed\:(https?\:\/\/[^ <]+)/;
  var genericUriMatcher = /(https?\:\/\/[^ <]+)/;
  var type = "unknown";
  var provider_name = "unknown";

  isDataFileUrl = function(url) {
    var file, suffix;
    try {
      if (url.split("/").length < 4) {
        return false;
      }
      file = _.last(url.split("/"));
      if (file.indexOf(".") < 0) {
        return false;
      }
      suffix = _.last(file.split("."));
      if (!suffix) {
        return false;
      }
      if (_.include(["png", "jpg", "jpeg", "gif", "zip", "rar", "7z", "tar", "tgz", "gz", "xls", "xlsx", "doc", "docx", "ppt", "pptx", "mp3", "ogg", "oga", "ogv", "pdf", "dmg", "exe", "iso", "dxf", "ipa", "mov", "wmv", "wma", "wav", "aiff", "mp4", "m4a", "prg", "bin", "dat", "psd", "ai", "eps", "key"], suffix)) {
        return true;
      }
    } catch (_error) {}
    return false;
  };

  if (m = data.match(genericEmbedMatcher)) {
    embedUri = m[1];
    html = "<iframe width='100%' height='100%' src=\"" + embedUri + "\" seamless=\"1\" allowfullscreen=\"1\"></iframe>";
    recommendedWidth = 640 / 2;
    recommendedHeight = 390 / 2;
    sourceLink = embedUri;
    extraViewClasses = "external-embed";
  } else if (data.match(/http/) && data.replace(/[^<]/g, "").length < 3) {
    
    youtubeMatcher = /youtube\.com\/.*v=([^&<]+)/;
    youtubeMatcher2 = /youtu\.be\/([^&<]+)/;
    soundcloudMatcher = /soundcloud\.com\/([^<]+)/;
    vimeoMatcher = /vimeo.com\/([^<]*)/;
    dailyMotionMatcher = /dailymotion.com\/video\/([^<]*)/;
    googleMapsMatcher = /google.com\/maps\?([^<]*)/;
    spacedeckMatcher = new RegExp(location.host + "\/(spaces|folders)\/([0-9a-f]{24})");

    if (m = data.match(youtubeMatcher) || (m = data.match(youtubeMatcher2))) {
      videoId = m[1];
      html = "<iframe src=\"https://www.youtube.com/embed/" + videoId + "?html5=1&rel=0&showinfo=0&autohide=1\" frameborder=\"0\" allowfullscreen=\"1\"></iframe>";
      recommendedWidth = 640 / 2;
      recommendedHeight = 390 / 2;
      provider_name = "youtube";
      type = "video";

    } else if (m = data.match(dailyMotionMatcher)) {
      videoId = m[1];
      html = "<iframe src=\"https://www.dailymotion.com/embed/video/" + videoId + "\" frameborder=\"0\"></iframe>";
      recommendedWidth = 536 / 2;
      recommendedHeight = 302 / 2;

      provider_name = "dailymotion";
      type = "video";

    } else if (m = data.match(vimeoMatcher)) {
      videoId = m[1];
      html = "<iframe src=\"https://player.vimeo.com/video/" + videoId + "\" frameborder=\"0\"></iframe>";
      recommendedWidth = 536 / 2;
      recommendedHeight = 302 / 2;

      provider_name = "vimeo";
      type = "video";

    } else if (m = data.match(soundcloudMatcher)) {
      var scurl = "https://" + m[0];
      var url;
      if (m[0].indexOf("soundcloud.com/player")>=0) {
        url = "https://w." + m[0];
      } else {
        url = "https://w.soundcloud.com/player/?url="+encodeURI(scurl);
      }

      html = "<iframe scrolling=\"no\" frameborder=\"no\" src=\"" + url + "\"></iframe>";
      recommendedWidth = 720 / 2;
      recommendedHeight = 184;
      sourceLink = scurl;

      provider_name = "soundcloud";
      type = "audio";

    } else if ((m = data.match(googleMapsMatcher))) {
      mapsParams = m[1];
      html = "<iframe src=\"https://maps-api-ssl.google.com/maps?" + mapsParams + "\" seamless=\"1\" allowfullscreen=\"1\"></iframe>";
      recommendedWidth = 640 / 2;
      recommendedHeight = 390 / 2;

      provider_name = "google";
      type = "map";
    } else if ((m = data.match(genericUriMatcher)) && !isDataFileUrl(m[1])) {
      uri = m[1];
      grabUri = uri;
      endPoint = "/api/webgrabber/" + (encodeURIComponent(btoa(grabUri)));
      html = data.replace(uri, " <img src=\"" + endPoint + "\" title=\"" + uri + "\"/> ");
      recommendedWidth = 300;
      recommendedHeight = 300;
      sourceLink = uri;
    } else {
      plainText = true;
    }
  } else {
    plainText = true;
  }
  if (plainText) {
    // replace links with clickable links
    return null;
  }
  result = {
    html: html,
    thumbnail_width: recommendedWidth,
    thumbnail_height: recommendedHeight,
    type: type,
    provider_name: provider_name,
    url: sourceLink
  };
  return result;
};
