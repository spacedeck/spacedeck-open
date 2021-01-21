var fs = require('fs');
var cheerio = require("cheerio");

var artifact_vector_render = require("../public/javascripts/vector-render.js");

global.render_vector_shape = artifact_vector_render.render_vector_shape;
global.render_vector_drawing = artifact_vector_render.render_vector_drawing;

var artifact_view_model = require("../public/javascripts/spacedeck_board_artifacts.js").SpacedeckBoardArtifacts;

var template = fs.readFileSync("views/partials/space-isolated.html");

var dom = cheerio.load(template);

var compiled_js = "";

function emit(str,indent) {
  var spaces="";
  for (var i=0; i<indent; i++) spaces+="  ";
  compiled_js+=spaces+str;
}

function compile_expr(v) {
  v=v.replace(/'/g,"\\'");
  v=v.replace(/[\r\n]/g," ");

  f=/\{([^\|\{]+)\|([^\}]+)\}/.exec(v);
  if (f) {
    v=v.replace(f[1]+"|"+f[2],f[2]+"("+f[1]+")");
  }

  // replace braces
  v=v.replace(/\{\{\{?/g,"'+");
  v=v.replace(/\}\}\}?/g,"+'");
  return v;
}

var iterators = 0;

function walk(n,indent) {
  if (n.type == "tag") {
    //console.log("n: ",n.type,n.name,n.attribs);
  }

  var braces = 0;

  if (n.type == "text") {
    if (n.data.match(/[a-zA-Z0-9\{]+/)) {
      emit("h+='"+compile_expr(n.data)+"';",indent);
    }
  }
  else if (n.type == "tag") {
    var attrs = [];

    var keys = Object.keys(n.attribs);

    for (var i=0; i<keys.length; i++) {
      var k = keys[i];
      var v = n.attribs[k];

      if (k.substring(0,2) == "v-") {
        // vue attribute
        if (k.match("v-if")) {
          var test = emit("if ("+v+") {",indent);
          braces++;
          indent++;
        }
        else if (k.match("v-repeat")) {
          var parts = v.split("|")[0].split(":");
          var left = parts[0].replace(/ /g,"");
          var right = parts[1].replace(/ /g,"");
          iterators++;

          emit("for (var i"+iterators+"=0;i"+iterators+"<"+right+".length;i"+iterators+"++) {",indent);
          emit("var "+left+"="+right+"[i"+iterators+"];",indent+1);
          braces++;
          indent++;
        }
      } else {
        v=compile_expr(v);

        attrs.push(k+"=\""+v+"\"");
      }
    }

    emit("h+='<"+n.name+" "+attrs.join(" ")+">';",indent);

    for (var i=0; i<n.children.length; i++) {
      walk(n.children[i],indent);
    }

    emit("h+='</"+n.name+">';", indent);

    for (var i=braces; i>0; i--) {
      indent--;
      emit("}",indent);
    }
  }
}

function render_space_as_html(space, artifacts) {
  if (!compiled_js.length) {
    walk(dom("#space")[0],0);
    //console.log("compiled template: \n"+compiled_js);
  }

  // --------
  var mouse_state = "idle";
  var active_tool = "pointer";
  var active_space = space;
  var active_space_artifacts = artifacts;

  var bounds_zoom = 1;
  var bounds_margin_horiz = 0;
  var bounds_margin_vert = 0;
  var viewport_zoom = 1;
  // --------

  var editing_artifact_id = null;
  var urls_to_links = function(html) {
    return html;
  }

  artifact_view_model.selected_artifacts_dict = {};

  for (var i=0; i<active_space_artifacts.length; i++) {
    var a = active_space_artifacts[i];
    artifact_view_model.update_board_artifact_viewmodel(a);
    if (!a.description) a.description = "";
    if (!a.title) a.title = "";
  }

  var h="";
  try {
    eval(compiled_js);
  } catch (e) {
    console.error("error rendering space "+space._id+" as html: "+e);
  }

  var style="html, body, #space { overflow: visible !important; }\n";
  style+=".wrapper { border: none !important; }\n";

  h='<html>\n<head>\n<link rel="stylesheet" href="/stylesheets/style.css"><style>'+style+'</style>\n</head>\n<body id="main">\n'+h+"\n</html>\n";

  return h;
}

exports.render_space_as_html = render_space_as_html;
