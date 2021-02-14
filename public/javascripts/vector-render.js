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
  var shape = a.shape || "";
  var path = [];
  if(typeof a.control_points == 'string'){
    a.control_points = JSON.parse(a.control_points);
  }
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
        tip += "<path d=\"M-3,0 V6 L3,3 Z\" fill=\""+a.stroke_color+"\" stroke-width=\"0\"/></marker></defs>";
    var svg = tip + "<path d='" + d + "' style='stroke-width:" + a.stroke + ";' marker-end='url(#ae" + markerId + ")'/>";

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


function render_vector_star(tips,width,height,stroke) {
  //A 5-pointed (5 tips) regular star of radius from center to tip of 1 has a box around it of width = 2 cos(pi/10) and height = 1 + cos(pi/5)
  //  assuming the star is oriented with one point directly above the center.
  //  So the center of the star is at width * 1/2 and height * 0.552786 which is 1 / (1 + cos(pi/5)) (also assuming the y-axis is inverted).
  //  The inner points are at radius 0.381966 = sin(pi/10)/cos(pi/5).
  //  Fortunately with simple transformations with matrices, we can do rotations and scales easily.
  //  See https://en.wikipedia.org/wiki/Rotation_matrix for details.
  //  But because the stroke is done after scaling (it's not scaled), we have to adjust the points after the rotation and scaling happens.
  //A 10-pointed regular star is simpler because it is vertically symmetrical.

  //NOTE: for very thick stroke widths, and small stars, the star might render very strangely!

  var xcenter = width/2;
  var ycenter = 0;
  var inner_radius = 0;
  if (tips == 5) {
    ycenter = height * 0.552786;
    inner_radius = 0.381966; //scale compared to outer_radius of 1.0
  } else {
    //tips == 10
    ycenter = height/2;
    inner_radius = 0.7; //scale compared to outer_radius of 1.0
  }

  // Coordinates of the first tip, and the first inner corner
  var xtip = 1; // radius 1
  var ytip = 0;
  var xinner = inner_radius * Math.cos(Math.PI/(tips==5?5:10));
  var yinner = inner_radius * Math.sin(Math.PI/(tips==5?5:10));

  var points = [];

//  var tmp_outside_points = []; // uncomment to see the calculated edge of the star (outside the stroke width)

  var angle = 2*Math.PI / tips;
  // generate points without offset from stroke width first
  for (var i=0; i < tips; i++) {
    var a = i * angle - Math.PI/2;

    // Tip first...
    // Rotate the outer tip around the origin:
    var x = xtip * Math.cos(a);  // because ytip = 0 we don't include:  - ytip * Math.sin(a);
    var y = xtip * Math.sin(a);  // because ytip = 0 we don't include:  + ytip * Math.cos(a);
    // Scale for the bounding box:
    x = x * width / (2 * Math.cos(Math.PI/10));
    y = y * height / (tips==5?(1 + Math.cos(Math.PI/5)):2);
    points.push([x,y]);
//    tmp_outside_points.push(x+" "+y); // uncomment to see the calculated edge of the star (outside the stroke width)

    // Now the inner corner...
    // Rotate the inner corner around the origin:
    x = xinner * Math.cos(a) - yinner * Math.sin(a);
    y = xinner * Math.sin(a) + yinner * Math.cos(a);
    // Scale for the bounding box:
    x = x * width / (2 * Math.cos(Math.PI/10));
    y = y * height / (tips==5?(1 + Math.cos(Math.PI/5)):2);
    points.push([x,y]);
//    tmp_outside_points.push(x+" "+y); // uncomment to see the calculated edge of the star (outside the stroke width)
  }

  var inset_points = [];
  for (var i=0; i < points.length; i++) {
    var pA = points[(((i-1)%points.length)+points.length)%points.length]; // Javascript modulus "bug"
    var p0 = points[i];
    var pB = points[(i+1)%points.length];

    var dAx = p0[0] - pA[0];
    var dAy = p0[1] - pA[1];
    var dBx = p0[0] - pB[0];
    var dBy = p0[1] - pB[1];

    var dBLength = Math.sqrt(dBx**2 + dBy**2);

    // The trig here is a bit hairy.  Basically, finding the inset points is done by finding the angle (theta)
    // between the tips and the neighboring inner corners (or vice versa).  Then, that angle is used to
    // calculate vector scaling factors for half the thickness of the stroked path.  Which then is used to find
    // the actual inset points for the tips and inner corners.
    var theta = Math.atan2(dAx*dBy-dAy*dBx, dAx*dBx + dAy*dBy); // angle between the vectors
    var theta = (i%2? Math.PI * 2 - theta : theta);
    var stroke_prime = dBLength * Math.tan(theta/2); // this is really a scaling factor
    var xprime = p0[0] + (i%2?-1:1)*((stroke/2)/stroke_prime)*dBx + dBy*(stroke/2)/dBLength;
    var yprime = p0[1] + (i%2?-1:1)*((stroke/2)/stroke_prime)*dBy + -1 *  dBx*(stroke/2)/dBLength;;

    inset_points.push(xprime+","+yprime);
  }

// NOTE: use svg transformations to center the thing
  return "<polygon stroke-miterlimit='64' points='"+inset_points.join(" ")+"' transform='translate(" + xcenter + " " + ycenter + ")'/>";

// Append these if you want to see what is being calculated.
// The cyan dashed line is the outside of the star including the stroke width.
// The red dashed line is just the star polygon points themselves.
//    "<polygon stroke-width='4' stroke='red' stroke-dasharray='16 12' fill-opacity='0' points='"+inset_points.join(" ")+"' transform='translate(" + xcenter + " " + ycenter + ")'/>" +
//    "<polygon stroke-width='4' stroke='cyan' stroke-dasharray='16 12' fill-opacity='0' points='"+tmp_outside_points.join(" ")+"' transform='translate(" + xcenter + " " + ycenter + ")'/>";
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
  var stroke = parseInt(a.stroke) + 4;
  var offset = stroke / 2;

  var xr = (a.w-stroke) / 2;
  var yr = (a.h-stroke) / 2;

  var shape_renderers = {
    ellipse: function() { return render_vector_ellipse(xr, yr, offset); },
    pentagon: function() { return render_vector_ngon(5, xr, yr, offset); },
    hexagon: function()  { return render_vector_ngon(6, xr, yr, offset); },
    octagon: function()  { return render_vector_ngon(8, xr, yr, offset); },
    diamond: function()   { return render_vector_ngon(4, xr, yr, offset); },
    square: function()   { return "" },
    triangle: function() { return render_vector_ngon(3, xr, yr, offset); },
    star: function() { return render_vector_star(5, a.w, a.h, a.stroke); },
    burst: function() { return render_vector_star(10, a.w, a.h, a.stroke); },
    speechbubble: function() { return render_vector_speechbubble(xr, yr, offset); },
    heart: function() { return render_vector_heart(xr, yr, offset); },
    cloud: function() { return render_vector_cloud(xr, yr, offset); },
  }

  var render_func = shape_renderers[a.shape];

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
