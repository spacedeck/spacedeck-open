function vec2_add(a,b) {
  return {dx:a.dx+b.dx, dy:a.dy+b.dy};
}
function vec2_sub(a,b) {
  return {dx:a.dx-b.dx, dy:a.dy-b.dy};
}
function vec2_mul(a,f) {
  return {dx:a.dx*f, dy:a.dy*f};
}
function vec2_magn(v) {
  return Math.sqrt(v.dx*v.dx + v.dy*v.dy);
}
function vec2_unit(v) {
  var m = vec2_magn(v);
  if (m == 0) return {dx:0, dy:0};
  return {dx:v.dx/m, dy:v.dy/m};
}
function vec2_angle(v) {
  if (v.dx==0) return Math.atan2(v.dx+0.01, v.dy);
  return Math.atan2(v.dx, v.dy);
}

function render_vector_drawing(a, padding) {
  var shape = a.style.shape || "";
  var path = [];
  var p = a.control_points[0];

  if (!p) return "";

  path.push("M" + (p.dx + padding) + "," + (p.dy + padding) + " ");

  if (shape.match("arrow")) {
    var cps = a.control_points[0];
    var cpe = a.control_points[1];
    var cpm = a.control_points[2];
    if (!cpm) cpm = cpe;

    var markerId = a._id;

    var origin = cps;
    var end = cpe;
    var vec = vec2_sub(end, origin);
    var length = vec2_magn(vec);
    var middleVec = vec2_mul(vec2_unit(vec),length / 2);
    var middlePoint = vec2_add(origin, middleVec);
    var ortho = vec2_sub(cpm, middlePoint);
    var scaledMiddlePoint = vec2_add(vec2_mul(ortho,2), middlePoint);

    var d = "M" + (cps.dx + padding) + "," + (cps.dy + padding) + " Q" + (scaledMiddlePoint.dx + padding) + "," + (scaledMiddlePoint.dy + padding) + " " + (cpe.dx + padding) + "," + (cpe.dy + padding);
    var tip  = "<defs><marker id='ae" + markerId + "' refX=\"0.1\" refY=\"3\" markerWidth=\"3\" markerHeight=\"6\" orient=\"auto\">";
        tip += "<path d=\"M-3,0 V6 L3,3 Z\" fill=\""+a.style.stroke_color+"\" stroke-width=\"0\"/></marker></defs>";
    var svg = tip + "<path d='" + d + "' style='stroke-width:" + a.style.stroke + ";' marker-end='url(#ae" + markerId + ")'/>";

    return svg;
  }
  else if (false /*shape.match("scribble")*/) {
    var idx = 0;
    while (idx < a.control_points.length - 1) {
      var prevP = a.control_points[idx];
      
      if (a.control_points.length > idx + 1) {
        var p = a.control_points[idx + 1];
      } else {
        var p = prevP;
      }

      if (a.control_points.length > idx + 2) {
        var nextP = a.control_points[idx + 2];
      } else {
        var nextP = p;
      }

      var dpy = (p.dy - prevP.dy);
      var dpx = (p.dx - prevP.dx);
      var dny = (nextP.dy - p.dy);
      var dnx = (nextP.dx - p.dx);

      var distToNext = Math.sqrt(dny * dny + dnx * dnx);
      var distToPrev = Math.sqrt(dpy * dpy + dpx * dpx);

      var r = Math.sqrt((distToNext + distToPrev) / 2) * 2;

      var prevAngle = Math.atan2(dpy, dpx);
      var nextAngle = Math.atan2(dny, dnx);
      var bisectAngle = (prevAngle + nextAngle) / 2;
      var tangentAngle = bisectAngle;

      var cp1x = p.dx + Math.cos(tangentAngle) * -r;
      var cp1y = p.dy + Math.sin(tangentAngle) * -r;
      var cp2x = p.dx + Math.cos(tangentAngle) * r;
      var cp2y = p.dy + Math.sin(tangentAngle) * r;

      var dcp1x = cp1x - nextP.dx;
      var dcp1y = cp1y - nextP.dy;
      var dcp2x = cp2x - nextP.dx;
      var dcp2y = cp2y - nextP.dy;

      var distToCp1 = Math.sqrt(dcp1x * dcp1x + dcp1y * dcp1y) / r;
      var distToCp2 = Math.sqrt(dcp2x * dcp2x + dcp2y * dcp2y) / r;

      if (distToCp1 > distToCp2) {
        var curve = "S" + (cp1x + padding) + "," + (cp1y + padding) + " " + (p.dx + padding) + "," + (p.dy + padding);
      }
      else {
        var curve = "S" + (cp2x + padding) + "," + (cp2y + padding) + " " + (p.dx + padding) + "," + (p.dy + padding);
      }

      path.push(curve);
      idx += 1;
    }
  } else {
    for (var idx=0; idx<a.control_points.length; idx++) {
      var p = a.control_points[idx];
      var command = (idx==0) ? 'M' : 'L';

      path.push(command+(p.dx+padding)+','+(p.dy+padding));
    }
  }

  return "<path d='"+path.join(' ')+"'>";
}


function render_vector_star(edges,xradius,yradius,offset) {

  edges *= 2;

  var points = [];
  var degrees = 360 / edges;
  for (var i=0; i < edges; i++) {
    var a = i * degrees - 90;
    var xr = xradius;
    var yr = yradius;

    if (i%2) {
      if (edges==20) {
        xr/=1.5;
        yr/=1.5;
      } else {
        xr/=2.8;
        yr/=2.8;
      }
    }

    var x = offset + xradius + xr * Math.cos(a * Math.PI / 180);
    var y = offset + yradius + yr * Math.sin(a * Math.PI / 180);
    points.push(x+","+y);
  }
  
  return "<polygon points='"+points.join(" ")+"'/>";
}

function transform_vector_template(cmds, xr, yr, offset) {
  var cmd_str = "";
  for (var i = 0; i<cmds.length; i+=2) {
    var vals = cmds[i+1];
    for (var j = 0; j<vals.length; j+=2) {
      vals[j]*=(2*xr/100.0);
      vals[j+1]*=(2*yr/100.0);
    }

    cmd_str+=cmds[i]+cmds[i+1].join(',')+" ";
  }
  return cmd_str;
}

function render_vector_heart(xr, yr, offset) {
  var cmds = ['M',[50.141,98.5],
  'c',[0,0,-49,-38.334,-49,-67.982],
  'C',[1.141,15.333,14.356,1,30.659,1],
  'c',[7.437,0,14.244,2.791,19.435,7.33],
  'l',[0,0],
  'C',[55.296,3.742,62.141,1,69.622,1],
  'c',[16.303,0,29.519,14.166,29.519,29.518],
  'C',[99.141,60.334,50.141,98.5,50.141,98.5],
  'z',[]];

  svg ="<path d='"+ transform_vector_template(cmds, xr, yr, offset) +"'/>";

  return svg;
}

function render_vector_cloud(xr, yr, offset) {
  var cmds = ['M',[17.544,99.729],
  'c',[0,0,-17.544,6.929,-17.544,-36.699],
  'c',[0,-18.698,19.298,-28.047,19.298,-9.35],
  'c',[0,0,-3.508,-54.46,26.316,-53.672],
  'C',[71.93,0.704,68.421,34.983,68.421,34.983],
  'S',[100,25.634,100,72.379],
  'c',[0,28.047,-21.053,27.351,-21.053,27.351],
  'z',[]];

  svg ="<path d='"+ transform_vector_template(cmds, xr, yr, offset) +"'/>";

  return svg;
}


function render_vector_ellipse(xr, yr, offset) {
  svg = "<ellipse cx="+(xr+offset)+" cy="+(yr+offset)+" rx="+xr+" ry="+yr+">";

  return svg;
}

function render_vector_speechbubble(xr, yr, offset) {
  var cmds = ['M',[100,50],
  'c',[0,9.5,-2.7,18,-7.4,26],
  'C',[90,80,100,100,100,100],
  's',[-23.194,-6.417,-28,-4.162],
  'c',[-6.375,3,-13.5,4.7,-21,4.7],
  'C',[23,100,0.5,77,0.5,50],
  'C',[0.5,23,23,0.5,50,0.5],
  'C',[77,0.5,100,23,100,50],
  'z',[]]; 

  svg ="<path d='"+ transform_vector_template(cmds, xr, yr, offset) +"'/>";

  return svg;
}

function render_vector_ngon(edges,xradius,yradius,offset) {
  var points = [];
  var degrees = 360 / edges;
  for (var i=0; i < edges; i++) {
    var a = i * degrees - 90;

    var x = offset + xradius + xradius * Math.cos(a * Math.PI / 180);
    var y = offset + yradius + yradius * Math.sin(a * Math.PI / 180);
    points.push(x+","+y);
  }
  
  return "<polygon points='"+points.join(" ")+"'/>";
}

function render_vector_rect(xradius,yradius,offset) {
  return "<rect x='0' y='0' width='"+xradius*2+"' height='"+xradius*2+"'/>";
}

function render_vector_shape(a) {
  var stroke = parseInt(a.style.stroke) + 4;
  var offset = stroke / 2;

  var xr = (a.board.w-stroke) / 2;
  var yr = (a.board.h-stroke) / 2;

  var shape_renderers = {
    ellipse: function() { return render_vector_ellipse(xr, yr, offset); },
    pentagon: function() { return render_vector_ngon(5, xr, yr, offset); },
    hexagon: function()  { return render_vector_ngon(6, xr, yr, offset); },
    octagon: function()  { return render_vector_ngon(8, xr, yr, offset); },
    diamond: function()   { return render_vector_ngon(4, xr, yr, offset); },
    square: function()   { return "" },
    triangle: function() { return render_vector_ngon(3, xr, yr, offset); },
    star: function() { return render_vector_star(5, xr, yr, offset); },
    burst: function() { return render_vector_star(10, xr, yr, offset); },
    speechbubble: function() { return render_vector_speechbubble(xr, yr, offset); },
    heart: function() { return render_vector_heart(xr, yr, offset); },
    cloud: function() { return render_vector_cloud(xr, yr, offset); },
  }

  var render_func = shape_renderers[a.style.shape];

  if (!render_func) return "";

  return render_func();
}

function simplify_scribble_points(control_points) {
  var filtered_points = [];

  var thresh = 2;

  var idx=0;
  for (var i=0; i<control_points.length; i++) {
    var cp = control_points[i];

    var next = control_points[i+1];
    if (i>0) {
      var prev = control_points[i-1];
    }

    if (next && prev) {
      dprev = vec2_sub(cp, prev);
      dnext = vec2_sub(next, cp);

      aprev = vec2_angle(dprev);
      anext = vec2_angle(dnext);

      delta = Math.abs(Math.abs(aprev)-Math.abs(anext));

      delta2 = vec2_magn(vec2_sub(cp,prev));
      if (delta2>thresh && delta>0.1) {
        filtered_points.push(cp);
      }
    }
    else {
      filtered_points.push(cp);
    }
  }

  return filtered_points;
}

if (typeof(window) == 'undefined') {
  exports.render_vector_shape = render_vector_shape;
  exports.render_vector_drawing = render_vector_drawing;
}
