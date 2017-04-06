function validateEmail(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function zero_pad(num) {
  zero = 2 - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function format_time(seconds) {
  if (isNaN(seconds)) seconds = 0;
  return zero_pad(parseInt(seconds/60)) + ":" + zero_pad(parseInt(seconds%60));
}

var url_to_links_rx = /(^|[\s\n]|>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
function urls_to_links(text) {
  return text.replace(url_to_links_rx, "$1<a target='_blank' href='$2'>$2</a>");
}

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function get_query_param(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
function random_string(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!-_";

  for (var i=0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function fixup_touches(evt) {
  // convert touch events
  var e = evt;
  if (evt.originalEvent) e = evt.originalEvent;
  evt = {
    pageX: evt.pageX,
    pageY: evt.pageY,
    offsetX: evt.offsetX,
    offsetY: evt.offsetY,
    clientX: evt.clientX,
    clientY: evt.clientY,
    layerX: evt.layerX,
    layerY: evt.layerY,
    target: evt.target,
    currentTarget: evt.currentTarget
  };
  
  if (e.changedTouches && e.changedTouches.length) {
    evt.pageX = e.changedTouches[0].pageX;
    evt.pageY = e.changedTouches[0].pageY;
  } else if (e.touches && e.touches.length) {
    evt.pageX = e.touches[0].pageX;
    evt.pageY = e.touches[0].pageY;
  }
  return evt;
}

function rgb_to_hex(r, g, b) {
  return ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
}

function hex_to_rgba(color) {

  if (!color || color == "transparent") {
    return {r:0,g:0,b:0,a:0};
  }

  if (color.match("rgb\\(")) {
    color = color.replace("rgb(","").replace(")","").split(",");
    return {
      r: color[0],
      g: color[1],
      b: color[2],
      a: 255
    };
  }

  if (color.match("rgba\\(")) {
    color = color.replace("rgba(","").replace(")","").split(",");
    return {
      r: color[0],
      g: color[1],
      b: color[2],
      a: color[3]*255
    };
  }

  var r = parseInt(color.substr(1,2), 16);
  var g = parseInt(color.substr(3,2), 16);
  var b = parseInt(color.substr(5,2), 16);
  var a = 255;
  if (color.length>7) {
    a = parseInt(color.substr(7,2), 16);
  }
  return {r:r,g:g,b:b,a:a};
}

function rgb_to_hsv () {
  var rr, gg, bb,
      r = arguments[0] / 255,
      g = arguments[1] / 255,
      b = arguments[2] / 255,
      h, s,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
      diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(r);
    gg = diffc(g);
    bb = diffc(b);

    if (r === v) {
      h = bb - gg;
    } else if (g === v) {
      h = (1 / 3) + rr - bb;
    } else if (b === v) {
      h = (2 / 3) + gg - rr;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: h || 0,
    s: s || 0,
    v: v || 0
  };
}

// values?
function hsv_to_rgb(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (h && s === undefined && v === undefined) {
      s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }
  return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
  };
}

temp_grid_canvas = document.createElement("canvas");

function render_grid(w,h,divisions) {
  temp_grid_canvas.width = w;
  temp_grid_canvas.height = h;

  var step = w / divisions;

  var ctx = temp_grid_canvas.getContext('2d');
  ctx.strokeStyle = "#f0f0f0";
  ctx.lineWidth = 1;

  var gc1 = "rgba(60,60,60,0.125)";
  var gc2 = "rgba(60,60,60,0.075)";

  for (var y=0; y<h; y+=step) {
    if (y==0) {
      ctx.fillStyle = gc1;
    } else {
      ctx.fillStyle = gc2;
    }
    ctx.fillRect(0,y,w,1);
  }
  for (var x=0; x<h; x+=step) {
    if (x==0) {
      ctx.fillStyle = gc1;
    } else {
      ctx.fillStyle = gc2;
    }
    ctx.fillRect(x,0,1,h);
  }

  var data_url = temp_grid_canvas.toDataURL()
  return data_url;
}

function focus_contenteditable(el, end) {
  range = document.createRange();

  if (!range || !el) return;
  var p = $(el).find("p");
  if (!p.length) return;

  // get last paragraph
  p = p[p.length-1];
  
  range.selectNodeContents(p);
  
  selection = window.getSelection();
  selection.removeAllRanges();
  if (range.toString()!="Text") {
    // move cursor to the end
    range.collapse(false);
  }
  selection.addRange(range);

  el.focus();
}

function setup_exclusive_audio_video_playback() {
  document.addEventListener('play', function(e) {

    var tags = ["audio","video"];

    for (var i=0; i<tags.length; i++) {
      var tag = tags[i];
      var players = document.getElementsByTagName(tag);
      for (var i = 0, len = players.length; i < len; i++) {
        if (players[i] != e.target) {
          players[i].pause();
        }
      }
    }
  }, true);
}
