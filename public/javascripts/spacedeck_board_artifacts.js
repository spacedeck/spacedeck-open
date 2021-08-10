/*
  SpacedeckBoardArtifacts
  This module contains functions dealing with absolute positioned Board Section Artifacts.
*/

var SpacedeckBoardArtifacts = {
  update_board_artifact_viewmodel: function(a) {
    var mt = this.artifact_major_type(a);

    a.view = {
      _id:                  a._id,
      classes:              this.artifact_classes(a),
      style:                this.artifact_style(a),
      grid_style:           this.artifact_style(a, true),
      inner_style:          this.artifact_inner_style(a),
      text_cell_style:      this.artifact_text_cell_style(a),
      vector_svg:           this.artifact_vector_svg(a),
      payload_uri:          a.payload_uri,
      thumbnail_uri:        this.artifact_thumbnail_uri(a),
      major_type:           mt,
      text_blank:           this.artifact_is_text_blank(a),
      payload_alternatives: a.payload_alternatives,
      filename:             this.artifact_filename(a),
      oembed_html:          this.artifact_oembed_html(a),
      link:                 this.artifact_link(a),
      link_caption:         this.artifact_link_caption(a),
      interactive:          0
    };

    if ((mt == "audio" || mt == "video") && !a.player_view) {
      a.player_view = {
        state: "stop",
        current_time_string: "",
        total_time_string: "",
        current_time_float: 0.0,
        inpoint_float: 0.0,
        outpoint_float: 0.0
      };
    }

    if ("medium_for_object" in this) {
      var medium = this.medium_for_object[a._id];
      if (medium && a._id != this.editing_artifact_id) {
        medium.value(a.description.toString());
      }
    }
  },

  is_artifact_audio: function(a) {
    if (a) {
      return a.mime.match("audio");
    } else return false;
  },

  artifact_filename: function(a) {
    if (a.payload_uri) {
      return a.payload_uri.replace(/.*\//g,"");
    } else {
      return "";
    }
  },

  artifact_link: function(a) {
    if (a.link_uri) {
      return a.link_uri;
    } else {
      return "";
    }
  },

  artifact_link_caption: function(a) {
    if (a.link_uri) {
      var parts = a.link_uri.split("/");
      // scheme://domain.foo/...
      // 0      1 2
      if (parts.length>2) {
        return parts[2];
      }
      return "Link";
    } else {
      return "";
    }
  },

  artifact_is_selected: function(a) {
    if (!a) return false;
    return !!this.selected_artifacts_dict[a._id];
  },

  artifact_is_text_blank: function(a) {
    if (a.description) {
      desc = a.description.toString();
      var filtered = desc.replace(/<[^>]+>/g,"").replace(/\s/g,"");
      return (filtered.length<1);
    } else {
      return false;
    }
  },

  artifact_classes: function(a) {
    clzs = ["artifact", "artifact-"+this.artifact_major_type(a), a.mime.replace("/","-")];

    if (this.artifact_is_selected(a) && this.editing_artifact_id!=a._id) clzs.push("selected");
    if (!a._id) clzs.push("creating");

    if (a.align) clzs.push("align-"+a.align);
    if (a.valign) clzs.push("align-"+a.valign);
    
    clzs.push("state-"+a.state);

    if (this.artifact_is_text_blank(a)) {
      clzs.push("text-blank");
    }

    if (a.locked) {
      clzs.push("locked");
    }
    
    return clzs.join(" ");
  },

  artifact_inner_style: function(a) {
    var styles = [];

    //if (a.style) {

      var svg_style = ((a.mime.match("vector") || a.mime.match("shape")) && a.shape!="square");

      if (!svg_style) {
        if (a.stroke) {
          styles.push("border-width:"+a.stroke+"px");
          styles.push("border-style:"+(a.stroke_style||"solid"));
        }
        if (a.stroke_color) {
          styles.push("border-color:"+a.stroke_color);
        }
        if (a.border_radius) {
          styles.push("border-radius:"+a.border_radius+"px");
        }
      }

      if (a.fill_color && !svg_style) {
        styles.push("background-color:"+a.fill_color);
      }
      if (a.text_color) {
        styles.push("color:"+a.text_color);
      }

      var filters = [];

      if (!isNaN(a.brightness) && a.brightness != 100) {
        filters.push("brightness("+a.brightness+"%)");
      }
      if (!isNaN(a.contrast) && a.contrast != 100) {
        filters.push("contrast("+a.contrast+"%)");
      }
      if (!isNaN(a.opacity) && a.opacity != 100) {
        filters.push("opacity("+a.opacity+"%)");
      }
      if (!isNaN(a.hue) && a.hue) {
        filters.push("hue-rotate("+a.hue+"deg)");
      }
      if (!isNaN(a.saturation) && a.saturation != 100) {
        filters.push("saturate("+a.saturation+"%)");
      }
      if (!isNaN(a.blur) && a.blur) {
        filters.push("blur("+a.blur+"px)");
      }

      if (filters.length) {
        styles.push("-webkit-filter:"+filters.join(" "));
        styles.push("filter:"+filters.join(" "));
      }
    //}

    return styles.join(";");
  },

  artifact_text_cell_style: function(a, for_text_editor) {
    var styles = [];

    if (a.padding_left)   styles.push("padding-left:"+a.padding_left+"px");
    if (a.padding_right)  styles.push("padding-right:"+a.padding_right+"px");
    if (a.padding_top)    styles.push("padding-top:"+a.padding_top+"px");
    if (a.padding_bottom) styles.push("padding-bottom:"+a.padding_bottom+"px");

    return styles.join(";");
  },

  artifact_style: function(a, for_grid) {
    var styles = [];
    var z = 0;

    z = a.z;
    if (z<0) z=0; // fix negative z-index

    styles = [
      "left:"  +a.x+"px",
      "top:"   +a.y+"px",
      "width:" +a.w+"px",
      "height:"+a.h+"px",
      "z-index:"+z
    ];

    if (a.margin_left)   styles.push("margin-left:"+a.margin_left+"px");
    if (a.margin_right)  styles.push("margin-right:"+a.margin_right+"px");
    if (a.margin_top)    styles.push("margin-top:"+a.margin_top+"px");
    if (a.margin_bottom) styles.push("margin-bottom:"+a.margin_bottom+"px");

    // FIXME: via class logic?
    if (a.mime.match("vector")) {
      styles.push("overflow:visible");
    }

    return styles.join(";");
  },

  artifact_major_type: function(a) {
    if (a.mime.match("oembed")) return "oembed";
    if (a.mime.match("zone")) return "zone";
    if (a.mime.match("svg")) return "svg";
    if (a.mime.match("image")) return "image";
    if (a.mime.match("pdf")) return "image";
    if (a.mime.match("video")) return "video";
    if (a.mime.match("audio")) return "audio";
    if (a.mime.match("website")) return "website";
    if (a.mime.match("vector")) return "vector";
    if (a.mime.match("shape")) return "shape";
    if (a.mime.match("placeholder")) return "placeholder";
    if (a.mime.match("text") || a.mime.match("note")) return "text";

    return "file";
  },

  artifact_thumbnail_uri: function(a) {
    if (a.payload_thumbnail_big_uri) {
      if (a.w>800) {
        return a.payload_thumbnail_big_uri;
      }
    }
    return a.payload_thumbnail_medium_uri || a.payload_thumbnail_big_uri || a.payload_thumbnail_web_uri || "";
  },

  artifact_oembed_html: function(a) {
    if (this.artifact_major_type(a) != "oembed") return "";

    var parts = a.mime.split("/")[1].split("-");
    var type = parts[0];
    var provider = parts[1];

    if (!a.link_uri) {
      console.log("missing meta / link_uri: ",a);
      console.log("type/provider: ",type,provider);
      return ("missing metadata: "+a._id);
    }

    if (provider=="youtube") {
      var vid = a.link_uri.match(/(v=|\/)([a-zA-Z0-9\-_]{11})/);
      if (vid && vid.length>2) {
        var uri = "https://youtube.com/embed/"+vid[2];
        return "<iframe frameborder=0 allowfullscreen src=\""+uri+"?showinfo=0&rel=0&controls=0\"></iframe>";
      } else return "Can't resolve: "+a.payload_uri;

    } else if (provider=="dailymotion") {
      var match = a.link_uri.match(/dailymotion.com\/video\/([^<]*)/);
      if (match && match.length>1) {
        var uri = "https://www.dailymotion.com/embed/video/"+match[1];
        return "<iframe frameborder=0 allowfullscreen src=\""+uri+"\"></iframe>";
      } else return "Can't resolve: "+a.payload_uri;

    } else if (provider=="vimeo") {
      var match = a.link_uri.match(/https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/);
      if (match) {
        var uri = "https://player.vimeo.com/video/"+match[2];
        return "<iframe frameborder=0 allowfullscreen src=\""+uri+"\"></iframe>";
      } else return "Can't resolve: "+a.payload_uri;

    } else if (provider=="soundcloud") {
      return '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url='+a.link_uri.replace(":", "%3A")+'"></iframe>';

    } else if (provider=="spacedeck") {

      return ""; //<iframe frameborder=0 allowfullscreen src=\""+ a.meta.link_uri+"\"></iframe>

    } else {
      return "Don't know how to embed "+a.mime+".";
    }
  },

  artifact_vector_svg: function(a) {
    var mtype = this.artifact_major_type(a);

    if (mtype != "vector" && mtype != "shape") return "";

    var shape = a.shape || "";
    var padding = 32 + a.stroke*2;
    var path_svg;
    var fill = "";

    if (mtype == "vector") {
      path_svg = render_vector_drawing(a, padding);

      fill = "fill:none";
    } else {
      path_svg = render_vector_shape(a, padding);
      fill = "fill:"+a.fill_color+";";
      padding = 0;
    }
    var margin = padding;

    var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='"+(a.w+2*padding)+"' height='"+(a.h+2*padding)+"' ";
    svg += "style='margin-left:"+(-margin)+"px;margin-top:"+(-margin)+"px;stroke-width:"+a.stroke+";stroke:"+a.stroke_color+";"+fill+"'>";
    svg += path_svg;
    svg += "</svg>";

    return svg;
  },

  /* whiteboard layouting functions */

  artifact_enclosing_rect: function(arts) {
    if (arts.length==0) return null;

    r = {
      x1: parseInt(_.min(arts.map(function(a){return a.x}))),
      y1: parseInt(_.min(arts.map(function(a){return a.y}))),
      x2: parseInt(_.max(arts.map(function(a){return a.x+a.w}))),
      y2: parseInt(_.max(arts.map(function(a){return a.y+a.h})))
    };
    r.x=r.x1;
    r.y=r.y1;
    r.w=r.x2-r.x1;
    r.h=r.y2-r.y1;

    return r;
  },

  artifact_selection_rect: function() {
    return this.artifact_enclosing_rect(this.selected_artifacts());
  },

  rects_intersecting: function(r1,r2) {
    if ( (r1.x+r1.w < r2.x)
      || (r1.x > r2.x+r2.w)
      || (r1.y+r1.h < r2.y)
      || (r1.y > r2.y+r2.h) ) return false;
    return true;
  },

  artifacts_in_rect: function(rect) {
    return _.filter(this.active_space_artifacts, function(a) {
      return this.rects_intersecting(a, rect);
    }.bind(this));
  },

  layout_stack_top: function() {
    this.begin_transaction();

    var rect = this.artifact_selection_rect();
    var overlapping = _.filter(this.artifacts_in_rect(rect), function(a){return !this.is_selected(a)}.bind(this));

    var max_z = _.max(overlapping,function(a){ return a.z; });

    if (max_z.z) {
      max_z = max_z.z + 1;
    } else {
      max_z = 1;
    }
    
    this.update_selected_artifacts(function(a) {
      return { z: max_z };
    });
  },

  layout_stack_bottom: function() {
    this.begin_transaction();

    var rect = this.artifact_selection_rect();
    var overlapping = _.filter(this.artifacts_in_rect(rect), function(a){return !this.is_selected(a);}.bind(this));

    var min_z = _.min(overlapping,function(a){ return a.z; });
    if (min_z.z) {
      min_z = min_z.z - 1;
    } else {
      min_z = 0;
    }
    var my_z = _.max(this.selected_artifacts(),function(a){ return a.z; });
    if (my_z.z) {
      my_z = my_z.z - 1;
    } else {
      my_z = 0;
    }

    // TODO: move all other items up in this case?
    if (min_z < 0) {
      this.update_artifacts(overlapping, function(a) {
        return { z: (my_z + a.z + 1) };
      });

      return;
    }

    this.update_selected_artifacts(function(a) {
      return { z: min_z };
    });
  },

  layout_align_left:function() {
    this.begin_transaction();

    var rect = this.artifact_selection_rect();
    this.update_selected_artifacts(function(a) {
      return { x: rect.x1 };
    });
  },

  layout_align_top: function() {
    this.begin_transaction();

    var rect = this.artifact_selection_rect();
    this.update_selected_artifacts(function(a) {
      return { y: rect.y1 };
    });
  },

  layout_align_right: function() {
    this.begin_transaction();

    var rect = this.artifact_selection_rect();
    this.update_selected_artifacts(function(a) {
      return { x: rect.x2 - a.w };
    });
  },

  layout_align_bottom: function() {
    this.begin_transaction();

    var rect = this.artifact_selection_rect();
    this.update_selected_artifacts(function(a) {
      return { y: rect.y2 - a.h };
    });
  },

  layout_align_center: function() {
    this.begin_transaction();

    var rect = this.artifact_selection_rect();
    var cx = rect.x1 + (rect.x2-rect.x1)/2;
    this.update_selected_artifacts(function(a) {
      return { x: cx - a.w/2 };
    });
  },

  layout_align_middle: function() {
    this.begin_transaction();

    var rect = this.artifact_selection_rect();
    var cy = rect.y1 + (rect.y2-rect.y1)/2;
    this.update_selected_artifacts(function(a) {
      return { y: cy - a.h/2 };
    });
  },

  layout_match_size_horiz:function() {
    this.begin_transaction();

    var arts = this.selected_artifacts();
    if (arts.length<2) return;

    var totalw  = _.reduce(arts, function(sum, a) { return sum + a.w }, 0);
    var avgw    = totalw / arts.length;

    this.update_selected_artifacts(function(a) {
      return { w: avgw };
    });
  },

  layout_match_size_vert:function() {
    this.begin_transaction();

    var arts = this.selected_artifacts();
    if (arts.length<2) return;

    var totalh  = _.reduce(arts, function(sum, a) { return sum + a.h }, 0);
    var avgh    = totalh / arts.length;

    this.update_selected_artifacts(function(a) {
      return { h: avgh };
    });
  },

  layout_match_size_both:function() {
    this.layout_match_size_horiz();
    this.layout_match_size_vert();
  },

  layout_distribute_horizontal: function() {
    this.begin_transaction();

    var selected = this.selected_artifacts();
    if (selected.length<3) return;

    var sorted = _.sortBy(selected, function(a) { return a.x });
    var startx = sorted[0].x + sorted[0].w/2;
    var stopx  = _.last(sorted).x + _.last(sorted).w/2;
    var step   = (stopx-startx)/(sorted.length-1);

    for (var i=1; i<sorted.length-1; i++) {
      var a = sorted[i];
      var x = startx + step*i - a.w/2;
      this.update_artifacts([a],function(a) {
        return { x: x }
      });
    }
  },

  layout_distribute_vertical: function() {
    this.begin_transaction();

    var selected = this.selected_artifacts();
    if (selected.length<3) return;

    var sorted = _.sortBy(selected, function(a) { return a.y });
    var starty = sorted[0].y + sorted[0].h/2;
    var stopy  = _.last(sorted).y + _.last(sorted).h/2;
    var step   = (stopy-starty)/(sorted.length-1);

    for (var i=1; i<sorted.length-1; i++) {
      var a = sorted[i];
      var y = starty + step*i - a.h/2;
      this.update_artifacts([a],function(a) {
        return { y: y }
      });
    }
  },

  layout_distribute_horizontal_spacing: function() {
    this.begin_transaction();

    var selected = this.selected_artifacts();
    if (selected.length<3) return;

    var sorted  = _.sortBy(selected, function(a) { return a.x });
    var startx  = sorted[0].x;
    var stopx   = _.last(sorted).x + _.last(sorted).w;
    var range   = stopx - startx;
    var totalw  = _.reduce(sorted, function(sum, a) { return sum + a.w }, 0);
    var avgs    = (range - totalw) / (sorted.length-1);
    var prevend = startx + sorted[0].w;

    for (var i=1; i<sorted.length-1; i++) {
      var a = sorted[i];
      var x = prevend + avgs;
      this.update_artifacts([a],function(a) {
        return { x: x }
      });
      prevend = x+a.w;
    }
  },

  layout_distribute_vertical_spacing: function() {
    this.begin_transaction();

    var selected = this.selected_artifacts();
    if (selected.length<3) return;

    var sorted  = _.sortBy(selected, function(a) { return a.y });
    var starty  = sorted[0].y;
    var stopy   = _.last(sorted).y + _.last(sorted).h;
    var range   = stopy - starty;
    var totalh  = _.reduce(sorted, function(sum, a) { return sum + a.h }, 0);
    var avgs    = (range - totalh) / (sorted.length-1);
    var prevend = starty + sorted[0].h;

    for (var i=1; i<sorted.length-1; i++) {
      var a = sorted[i];
      var y = prevend + avgs;
      this.update_artifacts([a],function(a) {
        return { y: y }
      });
      prevend = y+a.h;
    }
  },

  layout_auto: function() {
    this.begin_transaction();

    var selected = this.selected_artifacts();
    if (selected.length<2) return;

    var sorted = _.sortBy(selected, function(a) { return a.x+a.y*this.active_space.width }.bind(this));

    var minx = sorted[0].x;
    var miny = sorted[0].y;

    var sorted = _.sortBy(selected, function(a) { return -Math.max(a.w,a.h) }.bind(this));
    
    var blocks = [];

    var padding = 10;

    for (var i=0; i<sorted.length; i++) {
      var a = sorted[i];
      blocks.push({
        w: a.w+padding,
        h: a.h+padding,
        a: a
      });
    }
    
    var packer = new GrowingPacker();
    packer.fit(blocks);

    for (var i=0; i<blocks.length; i++) {
      var block = blocks[i];
      if (block.fit) {
        var a = block.a;
        this.update_artifacts([a],function(a) {
          return {
            x: minx+block.fit.x,
            y: miny+block.fit.y
          }
        });
      }
    }
  },
  
  show_artifact_comments: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var artifact = this.selected_artifacts()[0];

    this.selected_artifact = artifact;
    this.activate_modal('artifact');
  },

  create_artifact_comment: function(artifact, comment) {
    var data = {
      artifact_id: artifact._id,
      space_id: this.active_space._id,
      message: comment,
      user: this.user
    };

    save_comment(this.active_space._id, data, function(comment) {
      this.active_space_messages.push(comment);
      this.artifact_comment = "";
    }.bind(this), function(xhr){
      console.error(xhr);
    }.bind(this));
  },

  remove_artifact_comment: function(comment) {
    delete_comment(this.active_space._id, comment._id, function(comment) {
      this.active_space_messages.pop(comment);
    }.bind(this), function(xhr){
      console.error(xhr);
    }.bind(this));
  }

}

if (typeof(window) == 'undefined') {
  exports.SpacedeckBoardArtifacts = SpacedeckBoardArtifacts;
}
