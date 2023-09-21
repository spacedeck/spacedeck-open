/*
  SpacedeckSections
  This module contains functions dealing with Space Sections UI.
*/

var SpacedeckSections = {

  data: {
    MAX_COLUMNS: 20,

    isShift: false,

    redo_stack: [],
    undo_stack: [],

    opened_dialog: "none", // which property panel to display
    color_options_picker: false,
    advanced_properties: false,

    embed_code_html: "",
    active_tool: "pointer",
    lightbox_artifact: {},
    snap_ruler_y: -1000,
    snap_ruler_x: -1000,

    minimap_width: 100,
    minimap_height: 200,
    minimap_scale: 10,
    scroll_left: 0,
    scroll_top: 0,
    window_width: 800,
    window_height: 600,
    bounds_margin_horiz: 0,
    bounds_margin_vert: 0,

    editing_artifact_id: null,
    selected_artifacts_dict: {},
    first_selected_artifact: null,
    selection_metrics: {
      contains_text: false,
      contains_images: false,
      contains_audio: false,
      contains_vectors: false,
      contains_shapes: false,
      borders_stylable: true,
      count: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      style: "display:none",
      vector_points: [{},{}],
      vector_selection: false
    },
    selected_artifacts_json: "",
    zones: [],
    user_cursors: [],

    default_style: {}, // will be copied from active_style on startup

    active_style: {
      border_radius: 0,
      stroke: 2,
      font_family: "Inter",
      font_size: 36,
      line_height: 1.5,
      letter_spacing: 0,

      stroke_color: ENV.options.default_stroke_color ? ENV.options.default_stroke_color : "#000000",
      fill_color: ENV.options.default_fill_color ? ENV.options.default_fill_color : "#000000",
      text_color: ENV.options.default_text_color ? ENV.options.default_text_color : "#000000",
      background_color: "#ffffff",

      padding: 0,
      padding_horz: 0,
      padding_vert: 0,
      padding_top: 0,
      padding_left: 0,
      padding_right: 0,
      padding_bottom: 0,

      margin: 0,
      margin_horz: 0,
      margin_vert: 0,
      margin_top: 0,
      margin_left: 0,
      margin_right: 0,
      margin_bottom: 0,

      brightness: 100,
      contrast: 100,
      opacity: 100,
      saturation: 100,
      blur: 0,
      hue: 0,

      columns: 1,
      column_width: 900,
      row_height: 0,
      gutter: 0,
    },

    color_picker_target: "fill_color",

    color_picker_saturation: 255,
    color_picker_value: 255,
    color_picker_hue: 127,
    color_picker_opacity: 255,

    swatches: ENV.options.swatches ? ENV.options.swatches : [
      {id:1, hex:"#ff00ff"},
      {id:2, hex:"#ffff00"},
      {id:3, hex:"#00ffff"},
      {id:5, hex:"#ff0000"},
      {id:6, hex:"#00ff00"},
      {id:7, hex:"#0000ff"},
      {id:8, hex:"#000000"},
      {id:9, hex:"#222222"},
      {id:10, hex:"#444444"},
      {id:11, hex:"#888888"},
      {id:12, hex:"#bbbbbb"},
      {id:13, hex:"#dddddd"},
      {id:14, hex:"#ffffff"},

      {id:20, hex:"#4a2f7e"},
      {id:21, hex:"#9b59b6"},
      {id:22, hex:"#3498db"},
      {id:23, hex:"#2ecc71"},
      {id:24, hex:"#f1c40f"},
      {id:25, hex:"#e67e22"},
      {id:26, hex:"#d55c4b"},
      {id:27, hex:"#6f4021"},
      {id:29, hex:"#95a5a6"},
      {id:30, hex:"rgba(0,0,0,0)"}
    ],

    fonts: [
      "Inter",
      "Courier"
    ],

    detected_text_formats: {},
    active_text_format_name: "Paragraph",

    image_search_results: [],
    video_search_results: [],
    audio_search_results: [],
    generic_search_query: "",
    media_search_target: "google",
    search_loading: false,

    viewport_zoom: 1,
    viewport_zoom_percent: 100,
    bounds_zoom: 1,

    current_zone_idx: -1,

    margin_mode: "global",
    padding_mode: "global",
    delete_artifact: "unconfirmed",
    color_mode: "palette",
    background_mode: "image",
    layout_mode: "layout",
    follow_mode: true,
    space_background_uploading: false,

    toolbar_props_x: 0,
    toolbar_props_y: 0,
    toolbar_props_in: false,
    toolbar_artifacts_x: "-1000px",
    toolbar_artifacts_y: "-1000px",
    toolbar_artifacts_in: true,
    toolbar_lock_in: false
  },

  methods: {

    setup_section_module: function() {

      // defaults -----------------------------------------------------------------------------

      this.default_style = _.clone(this.active_style);

      // keybindings --------------------------------------------------------------------------

      Mousetrap.bind('del', function(evt)             { this.if_editable(function() {this.delete_selected_artifacts(evt);}) }.bind(this));
      Mousetrap.bind('backspace', function(evt)       { this.if_editable(function() {this.delete_selected_artifacts(evt);}) }.bind(this));
      Mousetrap.bind('esc', function(evt)             { this.deselect(); this.deactivate_tool(); }.bind(this));
      Mousetrap.bind(['command+d',      'ctrl+d'      ], function(evt) { evt.preventDefault(); evt.stopPropagation(); this.if_editable(function() {this.duplicate_selected_artifacts();}) }.bind(this));
      Mousetrap.bind(['command+z',      'ctrl+z'      ], function(evt) { this.if_editable(function() {this.undo();}) }.bind(this));
      Mousetrap.bind(['command+shift+z','ctrl+shift+z'], function(evt) { this.if_editable(function() {this.redo();}) }.bind(this));
      Mousetrap.bind(['command+a',      'ctrl+a'      ], function(evt) { this.if_editable(function() {this.select_all_artifacts();}) }.bind(this));
      Mousetrap.bind(['command+e',      'ctrl+e'      ], function(evt) { this.if_editable(function() {this.toggle_full_width();}) }.bind(this));
      Mousetrap.bind(['command+=',      'ctrl+='      ], function(evt) { evt.preventDefault(); evt.stopPropagation(); this.zoom_in();  }.bind(this));
      Mousetrap.bind(['command+-',      'ctrl+-'      ], function(evt) { evt.preventDefault(); evt.stopPropagation(); this.zoom_out(); }.bind(this));
      Mousetrap.bind('+', function(evt)               { evt.preventDefault(); evt.stopPropagation(); this.zoom_in();  }.bind(this));
      Mousetrap.bind('-', function(evt)               { evt.preventDefault(); evt.stopPropagation(); this.zoom_out(); }.bind(this));
      Mousetrap.bind('up', function(evt)              { this.nudge_selected_artifacts(0,-1,evt);}.bind(this));
      Mousetrap.bind('down', function(evt)            { this.nudge_selected_artifacts(0,1,evt);}.bind(this));
      Mousetrap.bind('left', function(evt)            { this.nudge_selected_artifacts(-1,0,evt);}.bind(this));
      Mousetrap.bind('right', function(evt)           { this.nudge_selected_artifacts(1,0,evt);}.bind(this));
      Mousetrap.bind('shift+up', function(evt)        { this.if_editable(function() {this.nudge_selected_artifacts(0,-10,evt);}) }.bind(this));
      Mousetrap.bind('shift+down', function(evt)      { this.if_editable(function() {this.nudge_selected_artifacts(0,10,evt);}) }.bind(this));
      Mousetrap.bind('shift+left', function(evt)      { this.if_editable(function() {this.nudge_selected_artifacts(-10,0,evt);}) }.bind(this));
      Mousetrap.bind('shift+right', function(evt)     { this.if_editable(function() {this.nudge_selected_artifacts(10,0,evt);}) }.bind(this));
      Mousetrap.bind('space', function(evt)           { this.activate_pan_tool(evt); }.bind(this));
      Mousetrap.bind(['shift'], function(evt)         { this.isShift = true; }.bind(this), 'keydown');
      Mousetrap.bind(['shift'], function(evt)         { this.isShift = false; }.bind(this), 'keyup');
      Mousetrap.bind('shift+up', function(evt)        { this.if_editable(function() {this.nudge_selected_artifacts(0,-10,evt);}) }.bind(this));
      $(document).bind("beforecopy", this.handle_onbeforecopy.bind(this));
      $(window).bind("beforeunload", this.handle_onunload.bind(this));
      $(window).bind("resize", this.handle_window_resize.bind(this));
    },

    setup_watches: function() {
      this.$watch('active_style.stroke', function (value, mutation) {
        this.set_artifact_style_prop("stroke",parseInt(this.active_style.stroke));
      }.bind(this));

      this.$watch('active_style.border_radius', function (value, mutation) {
        this.set_artifact_style_prop("border_radius",parseInt(this.active_style.border_radius));
      }.bind(this));

      this.$watch('active_style.padding', function (value, mutation) {
        this.active_style.padding_horz = this.active_style.padding;
        this.active_style.padding_vert = this.active_style.padding;
      }.bind(this));
      this.$watch('active_style.padding_horz', function (value, mutation) {
        this.active_style.padding_left = this.active_style.padding_horz;
        this.active_style.padding_right = this.active_style.padding_horz;
      }.bind(this));
      this.$watch('active_style.padding_vert', function (value, mutation) {
        this.active_style.padding_top = this.active_style.padding_vert;
        this.active_style.padding_bottom = this.active_style.padding_vert;
      }.bind(this));

      this.$watch('active_style.padding_top', function (value, mutation) {
        this.set_artifact_style_prop("padding_top",parseInt(this.active_style.padding_top));
      }.bind(this));
      this.$watch('active_style.padding_bottom', function (value, mutation) {
        this.set_artifact_style_prop("padding_bottom",parseInt(this.active_style.padding_bottom));
      }.bind(this));
      this.$watch('active_style.padding_left', function (value, mutation) {
        this.set_artifact_style_prop("padding_left",parseInt(this.active_style.padding_left));
      }.bind(this));
      this.$watch('active_style.padding_right', function (value, mutation) {
        this.set_artifact_style_prop("padding_right",parseInt(this.active_style.padding_right));
      }.bind(this));

      this.$watch('active_style.margin', function (value, mutation) {
        this.active_style.margin_horz = this.active_style.margin;
        this.active_style.margin_vert = this.active_style.margin;
      }.bind(this));

      this.$watch('active_style.margin_horz', function (value, mutation) {
        this.active_style.margin_left = this.active_style.margin_horz;
        this.active_style.margin_right = this.active_style.margin_horz;
      }.bind(this));
      this.$watch('active_style.margin_vert', function (value, mutation) {
        this.active_style.margin_top = this.active_style.margin_vert;
        this.active_style.margin_bottom = this.active_style.margin_vert;
      }.bind(this));

      this.$watch('active_style.margin_top', function (value, mutation) {
        this.set_artifact_style_prop("margin_top",parseInt(this.active_style.margin_top));
      }.bind(this));
      this.$watch('active_style.margin_bottom', function (value, mutation) {
        this.set_artifact_style_prop("margin_bottom",parseInt(this.active_style.margin_bottom));
      }.bind(this));
      this.$watch('active_style.margin_left', function (value, mutation) {
        this.set_artifact_style_prop("margin_left",parseInt(this.active_style.margin_left));
      }.bind(this));
      this.$watch('active_style.margin_right', function (value, mutation) {
        this.set_artifact_style_prop("margin_right",parseInt(this.active_style.margin_right));
      }.bind(this));

      this.$watch('active_style.stroke_color', function (value, mutation) {
        this.set_artifact_style_prop("stroke_color",this.active_style.stroke_color);

        var rgba = hex_to_rgba(this.active_style.stroke_color);
        var hsv = rgb_to_hsv(rgba.r, rgba.g, rgba.b);
        this.active_style.stroke_color_hsv = hsv;
      }.bind(this));

      this.$watch('active_style.fill_color', function (value, mutation) {
        this.set_artifact_style_prop("fill_color",this.active_style.fill_color);

        var rgba = hex_to_rgba(this.active_style.fill_color);
        var hsv = rgb_to_hsv(rgba.r, rgba.g, rgba.b);
        this.active_style.fill_color_hsv = hsv;
      }.bind(this));

      this.$watch('active_style.text_color', function (value, mutation) {
        this.set_artifact_style_prop("text_color",this.active_style.text_color);
        this.apply_formatting(null,"forecolor",this.active_style.text_color);

        var rgba = hex_to_rgba(this.active_style.text_color);
        var hsv = rgb_to_hsv(rgba.r, rgba.g, rgba.b);
        this.active_style.text_color_hsv = hsv;
      }.bind(this));

      this.$watch('active_style.font_size', function (value, mutation) {
        this.apply_formatting(null,"preciseFontSize",this.active_style.font_size+"px");
      }.bind(this));

      this.$watch('active_style.line_height', function (value, mutation) {
        this.apply_formatting(null,"lineHeight",this.active_style.line_height+"em");
      }.bind(this));

      this.$watch('active_style.letter_spacing', function (value, mutation) {
        this.apply_formatting(null,"letterSpacing",this.active_style.letter_spacing+"px");
      }.bind(this));

      // color picker

      this.$watch('color_picker_hue', function (value, mutation) {
        this.apply_color_picker();
      }.bind(this));

      this.$watch('color_picker_value', function (value, mutation) {
        this.apply_color_picker();
      }.bind(this));

      this.$watch('color_picker_saturation', function (value, mutation) {
        this.apply_color_picker();
      }.bind(this));

      this.$watch('color_picker_opacity', function (value, mutation) {
        this.apply_color_picker();
      }.bind(this));

      // filters

      this.$watch('active_style.brightness', function (value, mutation) {
        this.set_artifact_style_prop("brightness",parseInt(this.active_style.brightness));
      }.bind(this));

      this.$watch('active_style.blur', function (value, mutation) {
        this.set_artifact_style_prop("blur",parseInt(this.active_style.blur));
      }.bind(this));

      this.$watch('active_style.contrast', function (value, mutation) {
        this.set_artifact_style_prop("contrast",parseInt(this.active_style.contrast));
      }.bind(this));

      this.$watch('active_style.saturation', function (value, mutation) {
        this.set_artifact_style_prop("saturation",parseInt(this.active_style.saturation));
      }.bind(this));

      this.$watch('active_style.hue', function (value, mutation) {
        this.set_artifact_style_prop("hue",parseInt(this.active_style.hue));
      }.bind(this));

      this.$watch('active_style.opacity', function (value, mutation) {
        this.set_artifact_style_prop("opacity",parseInt(this.active_style.opacity));
      }.bind(this));

      this.throttled_save_active_space = _.throttle(function(){
        save_space(this.active_space);
      }.bind(this), 2000);

      // canvas
      this.$watch('active_style.background_color', function (value, mutation) {

        if (this.active_style.background_color != this.active_space.background_color) {
          this.$set("active_space.background_color",this.active_style.background_color);
          this.throttled_save_active_space();
        }

        var rgba = hex_to_rgba(this.active_style.background_color);
        var hsv = rgb_to_hsv(rgba.r, rgba.g, rgba.b);
        this.active_style.background_color_hsv = hsv;
      }.bind(this));
    },

    if_editable: function(fn) {
      // call given closure if space is editable
      // used by key bindings
      if (this.active_space_role!="viewer") fn.bind(this)();
    },

    background_image_style: function(images) {
      if (!images) return null;
      if (isNaN(images.length)) images = [images];

      for (var i=0; i<images.length; i++) {
        if (images[i] && images[i].length>0) {
          return "background-image: url("+images[i]+")";
        }
      }
    },

    space_thumbnail_style: function(space) {
      if (space.avatar_thumb_uri && space.avatar_thumb_uri.length>0) {
        return "background-image:url('"+space.avatar_thumb_uri+"')";
      }
      if (space.space_type == "folder") return "";

      var query_string = "";
      if (space_auth) {
        query_string+="?spaceAuth="+space.edit_hash;
      }

      return "background-image:url('/api/spaces/"+space._id+"/png"+query_string+"')";
    },

    reset_artifact_filters: function() {
      this.active_style.brightness = this.default_style.brightness;
      this.active_style.contrast = this.default_style.contrast;
      this.active_style.opacity = this.default_style.opacity;
      this.active_style.saturation = this.default_style.saturation;
      this.active_style.blur = this.default_style.blur;
      this.active_style.hue = this.default_style.hue;
    },

    increase_columns: function() {
      if (this.active_style.columns<this.MAX_COLUMNS) this.active_style.columns++;
    },

    decrease_columns: function() {
      if (this.active_style.columns>1) this.active_style.columns--;
    },

    extract_properties_from_selection: function() {
      // stop extract->apply feedback loop
      this.skip_formatting = true;

      var arts = this.selected_artifacts();
      window.setTimeout(function() {
        this.skip_formatting = false;
      }.bind(this),10);

      if (!arts.length) return;

      if (arts.length == 1) {
        var a = arts[0];

        var props = [
          "stroke",
          "border_radius",
          "letter_spacing",
          "stroke_color",
          "fill_color",
          "text_color"
        ];

        for (var i=0; i<props.length; i++) {
          var prop = props[i];
          this.active_style[prop]=a[prop];
        }

        // defaults
        //this.active_style.padding = this.default_style.padding;
        this.active_style.font_size = this.default_style.font_size;
        this.active_style.line_height = this.default_style.line_height;
        this.active_style.letter_spacing = this.default_style.letter_spacing;

        this.active_style.padding_top =    a.padding_top || 0;
        this.active_style.padding_bottom = a.padding_bottom || 0;
        this.active_style.padding_left =   a.padding_left || 0;
        this.active_style.padding_right =  a.padding_right || 0;

        if (this.active_style.padding_top == this.active_style.padding_bottom) {
          this.active_style.padding_vert = this.active_style.padding_top;
        }

        if (this.active_style.padding_left == this.active_style.padding_right) {
          this.active_style.padding_horz = this.active_style.padding_left;
        }

        if (this.active_style.padding_top  == this.active_style.padding_bottom &&
            this.active_style.padding_left == this.active_style.padding_right &&
            this.active_style.padding_left == this.active_style.padding_top) {
          this.active_style.padding = this.active_style.padding_top;
        }

        this.active_style.margin_top =    a.margin_top || 0;
        this.active_style.margin_bottom = a.margin_bottom || 0;
        this.active_style.margin_left =   a.margin_left || 0;
        this.active_style.margin_right =  a.margin_right || 0;

        if (this.active_style.margin_top == this.active_style.margin_bottom) {
          this.active_style.margin_vert = this.active_style.margin_top;
        }

        if (this.active_style.margin_left == this.active_style.margin_right) {
          this.active_style.margin_horz = this.active_style.margin_left;
        }

        if (this.active_style.margin_top  == this.active_style.margin_bottom &&
            this.active_style.margin_left == this.active_style.margin_right &&
            this.active_style.margin_left == this.active_style.margin_top) {
          this.active_style.margin = this.active_style.margin_top;
        }
      }

      this.update_selection_metrics();

      // extract text styles
      this.selection_metrics.contains_text = false;
      this.selection_metrics.contains_images = false;
      this.selection_metrics.contains_audio = false;
      this.selection_metrics.contains_embeds = false;
      this.selection_metrics.contains_vectors = false;
      this.selection_metrics.contains_shapes = false;
      this.selection_metrics.borders_stylable = false;

      var notes = _.filter(arts, function(a) { return (a.mime=="text/html" || a.mime=="x-spacedeck/shape") });

      if (notes.length>=1) {
        this.selection_metrics.contains_text = true;

        if (notes.length==1) {
          var a = notes[0];
          var dom = $("<div>"+a.description+"</div>")[0];
          var el = dom.firstChild;

          do {
            if (el && el.style) {
              if (el.style.fontSize) this.active_style.font_size = parseInt(el.style.fontSize);
              if (el.style.fontFamily) this.active_style.font_family = el.style.fontFamily;
              if (el.style.letterSpacing) this.active_style.letter_spacing = parseInt(el.style.letterSpacing);
              if (el.style.lineHeight) this.active_style.line_height = parseFloat(el.style.lineHeight);
              if (el.style.color) this.active_style.text_color = el.style.color;
            }
          } while (el && (el = dom.nextSibling));
        }
      }

      if (arts.length == 1) {
        this.extract_color_picker_from_selection();
      }

      var images = _.filter(arts, function(a) { return a.mime.match("image") });
      if (images.length>=1) {
        this.selection_metrics.contains_images = true;
      }

      var audio = _.filter(arts, function(a) { return a.mime.match("audio") });
      if (audio.length>=1) {
        this.selection_metrics.contains_audio = true;
      }

      var embeds = _.filter(arts, function(a) { return a.mime.match("embed") });
      if (embeds.length>=1) {
        this.selection_metrics.contains_embeds = true;
      }

      var embeds = _.filter(arts, function(a) { return a.mime=="x-spacedeck/vector" });
      if (embeds.length>=1) {
        this.selection_metrics.contains_vectors = true;
      }

      var embeds = _.filter(arts, function(a) { return a.mime=="x-spacedeck/shape"; });
      if (embeds.length>=1) {
        this.selection_metrics.contains_shapes = true;
      }

      var sm = this.selection_metrics;
      this.selection_metrics.borders_stylable = !(sm.contains_vectors||sm.contains_shapes);
    },

    increase_letter_spacing: function(evt) {
      this.active_style.letter_spacing++;
    },

    decrease_letter_spacing: function(evt) {
      this.active_style.letter_spacing--;
    },

    apply_font: function(evt, font) {
      this.apply_formatting(evt,'fontName',font);
      this.active_style.font_family = font;
    },

    toggle_advanced_properties: function() {
      this.advanced_properties = !this.advanced_properties;
    },

    open_dialog: function(id, evt) {
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }

      if (this.opened_dialog == id) {
        this.opened_dialog = "none";
        return;
      }

      if (_.contains(["mobile","shapes","zones"],id)) {
        this.deselect();
      }

      this.opened_dialog=id;

      if (id.match("color") || id.match("background")) {
        this.color_picker_target = id.replace("color-","")+"_color";
        this.color_mode = "palette";
        this.extract_color_picker_from_selection();
      }

      if (_.contains(["audio","video","image","search"],id)) {
        if ($("#"+id+" input")[0]) {
          $("#"+id+" input")[0].focus();
        }
      }

      if (this.opened_dialog == "background") {
        this.color_picker_target = "background_color";
        this.background_mode='color';
      }

      if (this.opened_dialog == "info") {
        this.access_settings_space = this.active_space;
        this.access_settings_memberships = this.active_space_memberships;
        this.editors_section = "list";

        if (this.active_space_is_readonly || this.embedded) {
          this.space_info_section = "info";
        } else if (this.active_space_role == "admin") {
          this.space_info_section = "access";
        }
      }
    },

    toggle_color_options: function() {
      this.color_options_picker = !this.color_options_picker;
    },

    close_lightbox: function() {
      this.lightbox_artifact = {};
      this.close_modal();
    },

    /* --------------- artifact manipulation ------------------------- */

    prepare_clipboard: function() {
      if ('ontouchstart' in window) return; // don't do this on touch devices

      this.selected_artifacts_json = JSON.stringify(this.selected_artifacts());
      //$("#space-clipboard > textarea")[0].blur();

      this.prepare_clipboard_step2();
    },

    prepare_clipboard_step2: function() {
      if ('ontouchstart' in window) return; // don't do this on touch devices

      setTimeout(function() {
        if (!$("#space-clipboard > textarea").length) return; // not ready yet

        $("#space-clipboard > textarea")[0].focus();
        $("#space-clipboard > textarea")[0].select();
      },100);
    },

    handle_onbeforecopy: function(evt) {
      if (this.editing_artifact_id) return;

      var focused_tag = evt.target.nodeName.toLowerCase();
      if (focused_tag != "body") return;

      this.prepare_clipboard_step2();

      window.setTimeout(function() {
        if (!$("#space-clipboard > textarea").length) return; // not ready yet
        $("#space-clipboard > textarea")[0].blur();
      },10);
    },

    handle_onunload: function(evt) {
      if (!window.artifact_save_queue) return;

      var changes = Object.keys(window.artifact_save_queue).length;

      if (changes>0) {
        var message = "There are "+changes+" changes that are still being saved. Discard them?";
        evt.returnValue = message;
        return message;
      }

      window._spacedeck_location_change = true;
    },

    handle_window_resize: function(evt) {
      this.adjust_bounds_zoom();
    },

    handle_scroll: function(evt) {
      if (this.active_view!="space") return;
      if (!$("#space").length) return;

      el = $("#space")[0];
      this.scroll_left   = el.scrollLeft/this.viewport_zoom;
      this.scroll_top    = el.scrollTop/this.viewport_zoom;
      this.window_width  = window.innerWidth/this.viewport_zoom;
      this.window_height = window.innerHeight/this.viewport_zoom;

      this.resize_minimap();

      // follow presenter mode: send viewport rectangle to viewers
      if (this.logged_in && this.present_mode) {
        if (this.active_space_role!="viewer") {
          this.presenter_send_viewport();
        }
      }
    },

    presenter_send_viewport: function() {
      name = this.user.nickname || this.user.email;

      var msg = {
        action: "viewport",
        x: this.scroll_left,
        y: this.scroll_top,
        w: this.window_width,
        h: this.window_height,
        zoom: this.viewport_zoom,
        name: name,
        id: this.user._id
      };

      var packed = JSON.stringify(msg);
      if (packed==this._old_viewport_msg) return;
      this._old_viewport_msg = packed;

      if (this.present_mode && this.active_space_role!="viewer")
        this.websocket_send(msg);
    },

    presenter_send_media_action: function(artifact_id,type,cmd,time) {
      name = this.user.nickname || this.user.email;

      var msg = {
        action: "media",
        artifact_id: artifact_id,
        type: type,
        command: cmd,
        time: time,
        name: name,
        id: this.user._id
      };
      if (this.present_mode && this.active_space_role!="viewer")
        this.websocket_send(msg);
    },

    resize_minimap: function() {
      if (!this.active_space) return;
      this.minimap_scale = this.active_space.width/100.0;
    },

    handle_minimap_mouseup: function(evt) {
      this.minimap_mouse_state = "idle";
    },

    handle_minimap_mousemove: function(evt) {
      if (this.minimap_mouse_state=="pressed") {
        this.handle_minimap_mousedown(evt);
      }
    },

    handle_minimap_mousedown: function(evt) {
      if (!$("#space").length) return;

      this.minimap_mouse_state = "pressed";
      el = $("#space")[0];

      evt = fixup_touches(evt);

      var ofs = $(evt.target).offset();
      var x = evt.pageX - ofs.left;
      var y = evt.pageY - ofs.top;

      el.scrollLeft = (x-this.window_width/(this.minimap_scale*2))*this.minimap_scale*this.viewport_zoom;
      el.scrollTop  = (y-this.window_height/(this.minimap_scale*2))*this.minimap_scale*this.viewport_zoom;
      this.handle_scroll();
    },

    handle_user_cursor_update: function(msg) {
      var now = new Date().getTime();
      msg.t = now;
      var existing = false;
      for (var i=0; i<this.user_cursors.length; i++) {
        var u = this.user_cursors[i];

        if (u.id == msg.id) {
          u.x = msg.x;
          u.y = msg.y;
          u.t = now;
          u.name = msg.name;
          existing = true;
        } else {
          // hide if no updates since 2sec
          if ((now-u.t)>5000) {
            u.x=-10000;
          }
        }
      }
      if (!existing) {
        this.user_cursors.push(_.clone(msg));
      }
    },

    handle_presenter_viewport_update: function(msg) {
      this.zoom_to_rect({
        x1: msg.x,
        y1: msg.y,
        x2: msg.x+msg.w,
        y2: msg.y+msg.h
      });
    },

    handle_presenter_media_update: function(msg) {
      if(this.follow_mode) {
        if (msg.type=="audio") {
          var sel="#artifact-"+msg.artifact_id+" .audio";
          try {
            $(sel)[0].dispatchEvent(new Event("remote_"+msg.command));
            console.log("event dispatched");
          } catch (e) {
          }
        }
        if (msg.type=="video") {
          var sel="#artifact-"+msg.artifact_id+" .video";
          try {
            $(sel)[0].dispatchEvent(new Event("remote_"+msg.command));
            console.log("event dispatched");
          } catch (e) {
          }
        }
      } else {
        console.log("ignore media update, muted");
      }
    },

    may_select: function(a) {
      if (!a) return false;
      if (!this.active_space) return false;

      if (this.active_space_role=="viewer" || (a.locked && this.active_space_role=="viewer")) {
        return false;
      }

      if (this.active_space.editors_locking && !this.logged_in && this.guest_nickname!=a.editor_name) {
        return false;
      }
      return true;
    },

    select: function(evt, a) {
      if (!this.may_select(a)) return;

      if (evt && !evt.shiftKey && this.is_selected(a)) return; // already selected

      if (!evt || !evt.shiftKey) {
        this.selected_artifacts_dict = {};
      }

      if (evt && evt.shiftKey) {
        if (this.selected_artifacts_dict[a._id]) {
          delete this.selected_artifacts_dict[a._id];
        } else {
          this.selected_artifacts_dict[a._id] = true;
        }
      } else {
        this.selected_artifacts_dict[a._id] = true;
      }

      this.update_board_artifact_viewmodel(a);
      this.extract_properties_from_selection();
      this.update_selection_metrics();
      this.prepare_clipboard();
      this.show_toolbar_props();
    },

    select_all_artifacts: function(evt) {
      this.deselect();
      for (var i=0; i<this.active_space_artifacts.length; i++) {
        var a = this.active_space_artifacts[i];
        if (this.may_select(a)) {
          this.selected_artifacts_dict[a._id] = true;
          this.update_board_artifact_viewmodel(a);
        }
      }

      this.update_selection_metrics();
      this.extract_properties_from_selection();
      this.prepare_clipboard();
      this.show_toolbar_props();
    },

    multi_select: function(arts) {
      for (var i=0; i<arts.length; i++) {
        var a = arts[i];
        if (this.may_select(a)) {
          this.selected_artifacts_dict[a._id] = true;
          this.update_board_artifact_viewmodel(a);
        }
      }

      this.extract_properties_from_selection();
      this.update_selection_metrics();
      this.prepare_clipboard();
      this.show_toolbar_props();
    },

    discover_zones: function() {
      this.zones = _.sortBy(_.filter(this.active_space_artifacts, function(a) { return (a.mime=="x-spacedeck/zone") }),
        function(z){return z.order});
    },

    artifact_plaintext: function(a) {
      if (!a) return "";
      var txt = $("<div>"+a.description+"</div>").text();
      return txt || "";
    },

    deselect: function(hard) {
      if (window._sd_fader_moving) {
        window._sd_fader_moving = false; // signal from fader directive
        return;
      }

      this.hide_toolbar_props();

      document.getSelection().removeAllRanges();

      blur();
      //this.prepare_clipboard();
      this.prepare_clipboard_step2();
      this.discover_zones();

      var prev_selected = this.selected_artifacts();
      this.selected_artifacts_dict = {};

      // nuke empty notes
      for (var i=0; i<prev_selected.length; i++) {
        var a = prev_selected[i];
        var keep = true;
        if (a && a.mime == "text/html") {
          var txt = this.artifact_plaintext(a);
          if (txt.length == 0) {
            keep = true; //Quick Fix For yassin, complains about buggy behaviour
          }
        }

        if (!keep) {
          this.selected_artifacts_dict[a._id] = a;
        }
      }
      this.delete_selected_artifacts(null, true); // delete all selected in loop

      this.selected_artifacts_dict = {};
      this.editing_artifact_id = null;
      this.opened_dialog = "none";

      for (var i=0; i<prev_selected.length; i++) {
        this.update_board_artifact_viewmodel(prev_selected[i]);
      }

      /*this.selection_metrics.x=0;
      this.selection_metrics.y=0;
      this.selection_metrics.w=0;
      this.selection_metrics.h=0;
      this.selection_metrics.style="display:none";*/
      this.selection_metrics.contains_text=false;
      this.selection_metrics.count=0;

      if (hard) {
        this.active_tool = "pointer";
        this.mouse_state = "idle";
      }

      this.update_selection_metrics();
    },

    is_selected: function(a) {
      if (!a) return;
      return (!!this.selected_artifacts_dict[a._id]);
    },

    unselected_artifacts: function() {
      return this.active_space_artifacts.filter(function(a){return !this.is_selected(a)}.bind(this));
    },


    selection_rect_style: function() {
      var r = this.selection_rect();
      if (r==null) return "display:none";

      return "left:"+r.x1+"px;top:"+r.y1+"px;width:"+(r.x2-r.x1)+"px;height:"+(r.y2-r.y1)+"px;";
    },

    selection_rect: function() {
      return this.enclosing_rect(this.selected_artifacts());
    },

    enclosing_rect: function(arts) {
      if (arts.length==0) return null;
      arts = _.filter(arts); // remove any nulls

      return {
        x1: parseInt(_.min(arts.map(function(a){return ((!a || !a.x)?0:a.x)}))),
        y1: parseInt(_.min(arts.map(function(a){return ((!a || !a.y)?0:a.y)}))),
        x2: parseInt(_.max(arts.map(function(a){return (!a?0:a.x+a.w)}))),
        y2: parseInt(_.max(arts.map(function(a){return (!a?0:a.y+a.h)})))
      };
    },

    update_selection_metrics: function(arts, temporary) {
      if (this.active_tool == "scribble") {
        this.selection_metrics.count = 1;
        return;
      }

      var sr = this.selection_rect() || {x:0,y:0,w:0,h:0,style:"display:none"};

      if (sr.x1 || sr.x2) {
        sr.w = sr.x2-sr.x1;
        sr.h = sr.y2-sr.y1;

        sr.style = this.selection_rect_style();

        var pp = this.space_point_to_window(sr.x1+sr.w/2,sr.y2);
        var pp2 = this.space_point_to_window(sr.x1+sr.w/2,sr.y1);

        pp.x-=260;
        pp.y-=10;

        if (pp.y>=window.innerHeight-300) {
          pp.y = pp2.y-100;
        }
        if (pp.x<0) {
          pp.x=0;
        }
        if (pp.y<0) {
          pp.y=0;
        }

        // FIXME make sure that menus fit in window
        this.toolbar_props_x = pp.x+"px";
        this.toolbar_props_y = pp.y+"px";
      }

      this.selection_metrics.x1 = sr.x1;
      this.selection_metrics.x2 = sr.x2;
      this.selection_metrics.y1 = sr.y1;
      this.selection_metrics.y2 = sr.y2;
      this.selection_metrics.x = sr.x;
      this.selection_metrics.y = sr.y;
      this.selection_metrics.w = sr.w;
      this.selection_metrics.h = sr.h;
      this.selection_metrics.style = sr.style;

      if (!arts) arts = this.selected_artifacts();

      if (!temporary) {
        this.first_selected_artifact = arts[0];
        this.selection_metrics.count=arts.length;
        this.selection_metrics.scribble_selection = false;
        if (arts.length == 1 && arts[0].mime == "x-spacedeck/vector") {
          if (arts[0].shape == "scribble") {
            this.selection_metrics.scribble_selection = true;
          }
          this.selection_metrics.vector_points = arts[0].control_points;
          this.selection_metrics.vector_selection = true;
        } else {
          this.selection_metrics.vector_points = [{},{}];
          this.selection_metrics.vector_selection = false;
        }
        this.selection_metrics.has_link=false;
        this.insert_link_url="";
        if (arts.length == 1 && arts[0].meta && arts[0].meta.link_uri && arts[0].meta.link_uri.length>0) {
          this.selection_metrics.has_link=true;
          this.insert_link_url = arts[0].meta.link_uri;
        }
      }
    },

    begin_transaction: function() {
      this.transaction_running = true;

      if (!this.undo_stack.length || this.undo_stack[this.undo_stack.length-1].action!="empty") {
        this.undo_stack.push({action:"empty"});
      } else {
        //console.log("undo slot is already empty.");
      }

      this.redo_stack = [];

      this.artifacts_before_transaction = this.active_space_artifacts.map(function(a) {
        return _.cloneDeep(a);
      });
    },

    fixup_space_size: function() {
      if (!this.active_space) return;

      this.active_space.width =Math.max(this.active_space.width, window.innerWidth);
      this.active_space.height=Math.max(this.active_space.height, window.innerHeight);
    },

    end_transaction: function() {
      this.transaction_running = false;
      this.throttled_process_artifact_save_queue();

      if (!this.active_space) return;

      var er = this.enclosing_rect(this.active_space_artifacts);
      if (!er) return;

      // resize space
      this.active_space.width =Math.max((parseInt(er.x2/window.innerWidth)+2)*window.innerWidth, window.innerWidth);
      this.active_space.height=Math.max((parseInt(er.y2/window.innerHeight)+2)*window.innerHeight, window.innerHeight);

      if (this._last_bounds_width != this.active_space.width ||
        this._last_bounds_height != this.active_space.height) {
        this._last_bounds_width = this.active_space.width;
        this._last_bounds_height = this.active_space.height;

        save_space(this.active_space);
      }

      this.resize_minimap();
      this.discover_zones();
    },

    find_artifact_before_transaction: function(needle) {
      return this.find_artifact_in_array(this.artifacts_before_transaction, needle);
    },

    find_artifact_in_array: function(haystack, needle) {
      var res = _.find(haystack, function(a) {
        return (needle._id && (a._id == needle._id));
      });
      return res;
    },

    unsaved_transactions: function() {
      if (!window.artifact_save_queue) return 0;
      return Object.keys(window.artifact_save_queue).length;
    },

    process_artifact_save_queue: function() {
      if (!window.artifact_save_queue) {
        return;
      }

      if (this.transaction_running) {
        console.log("not saving, transaction still in progress.");
        return;
      }

      var ids = Object.keys(window.artifact_save_queue);

      for (var i=0; i<ids.length; i++) {
        var id = ids[i];
        var a = window.artifact_save_queue[id];

        if (this.guest_nickname) {
          a.editor_name = this.guest_nickname;
        }

        save_artifact(a, function() {
          delete window.artifact_save_queue[id];
        }.bind(this), function(req) {
          if (req && req.status == 404) {
            // artifact was already deleted, ignore
            delete window.artifact_save_queue[id];
          } else {
            console.log("could not save artifact, will try again:",a,req);
          }
        });
      }

      // mark version dirty locally
      if (this.active_space) {
        this.active_space.updated_at = (new Date()).getTime();
      }

      //window.artifact_save_queue = {};
    },

    throttled_process_artifact_save_queue: function() {
      if (!this._throttled_process_artifact_save_queue) {
        this._throttled_process_artifact_save_queue = _.throttle(this.process_artifact_save_queue, 500);
      }
      this._throttled_process_artifact_save_queue();
    },

    queue_artifact_for_save: function(a) {
      if (!window.artifact_save_queue) {
        window.artifact_save_queue = {};
      }

      if (!a._id) {
        console.log("warning: illegal artifact queued for save");
      }

      // this is a bit hacky, but might be the smartest place to do it
      if (a.view && a.view.vector_svg) {
        a.shape_svg = a.view.vector_svg;
      }

      window.artifact_save_queue[a._id] = a;
    },

    update_properties: function(artifact_ids, changes) {
      for (var i=0; i<artifact_ids.length; i++) {
        var id = artifact_ids[i];

        var a = this.find_artifact_by_id(id);
        if (a) {
          var changed = false;

          for (k in changes[i]) {
            //console.log("change: ",k,": ",changes[i][k],"<-",a[k])
            a[k] = changes[i][k];
            changed = true;
          }

          this.update_board_artifact_viewmodel(a);

          // TODO: throttle, bundle etc
          if (changed) {
            this.queue_artifact_for_save(a);
          }
        }
      }
    },

    update_artifacts: function(artifacts, change_func) {
      var artifact_ids = [];
      var changes = [];

      for (var i=0; i<artifacts.length; i++) {
        var a = artifacts[i];
        var c = change_func(a);
        if (c) {
          artifact_ids.push(a._id);
          changes.push(c);
        }
      }

      if (changes.length) {
        this.push_to_undo({
          action: "update",
          artifact_ids: artifact_ids,
          changes: changes,
          snapshot: this.artifacts_before_transaction
        });
      }

      if (changes.length) {
        this.update_properties(artifact_ids, changes);
      }
    },

    push_to_undo: function(transaction) {
      // begin_transaction opens new undo slot
      // push_to_undo replaces the current undo slot

      this.undo_stack[this.undo_stack.length-1] = transaction;
      //console.log(transaction.action+"; undo_stack len: ",this.undo_stack.length);
    },

    undo: function() {
      if (!this.undo_stack.length || this.undo_stack[this.undo_stack.length-1].action=="empty") {
        console.log("nothing to undo!");
        return;
      }

      var step = this.undo_stack.pop();
      console.log("undo popped: ",step);
      this.redo_stack.push(step);

      for (var i=0; i<step.artifact_ids.length; i++) {
        var id = step.artifact_ids[i];
        var old_version = this.find_artifact_in_array(step.snapshot, {_id:id});

        if (step.action == "update") {
          if (old_version) {
            this.update_properties([id], [old_version]);
          }
        } else {
          delete old_version._id;
          save_artifact(old_version, function(restored_a) {
            this.update_board_artifact_viewmodel(restored_a);
            this.active_space_artifacts.push(restored_a);
            // TODO: rewrite undo history's artifact ids
          }.bind(this));
        }
      }
      this.update_selection_metrics();
    },

    redo: function() {
      if (!this.redo_stack.length) {
        console.log("nothing to redo!");
        return;
      }

      var step = this.redo_stack.pop();
      console.log("redo popped: ",step);
      this.undo_stack.push(step);

      this.update_properties(step.artifact_ids, step.changes);
      this.update_selection_metrics();
    },

    set_artifact_prop: function(prop, val) {
      this.begin_transaction();

      this.update_selected_artifacts(function(a) {
        var c = {};

        if (a[prop] != val) {
          //console.log("set_artifact_prop: ",c,val);
          c[prop]=val;
          return c;
        }

        return null;
      });
    },

    set_artifact_style_prop: function(prop, val) {
      this.begin_transaction();

      this.update_selected_artifacts(function(a) {
        var c = {};

        if (a[prop] != val) {
          //console.log("set_artifact_style_prop: ",c,val);
          c[prop]=val;
          return c;
        }

        return null;
      });
    },

    activate_color_mode: function(mode) {
      this.color_mode = mode;
      if (mode == 'picker') {
        // default to full alpha if color is 0,0,0,0
        if (this.color_picker_hue == 0 &&
          this.color_picker_saturation == 0 &&
          this.color_picker_value == 0 &&
          this.color_picker_opacity == 0) {
          this.color_picker_opacity = 255;
          this.color_picker_value = 255;
        }
      }
    },

    reset_stroke: function() {
      this.active_style.stroke = 2;
      this.active_style.border_radius = 0;
      this.active_style.stroke_style = "solid";
    },

    apply_font_size: function(px) {
      this.apply_formatting(null,"preciseFontSize",px+"px");
    },

    apply_swatch_color: function(swatch) {

      var rgba = hex_to_rgba(swatch.hex);

      var hsv = rgb_to_hsv(rgba.r, rgba.g, rgba.b);

      this.color_picker_hue = parseFloat(hsv.h*255);
      this.color_picker_saturation = parseFloat(hsv.s*255);
      this.color_picker_value = parseFloat(hsv.v*255);
      this.color_picker_opacity = rgba.a*255;
      this.color_picker_rgb = rgb_to_hex(rgba.r,rgba.g,rgba.b);

      //console.log("swatch hex: ",swatch.hex);

      this.active_style[this.color_picker_target] = swatch.hex;

      if (this.color_picker_target == "stroke_color") {
        if (!this.active_style.stroke) {
          // set a default stroke for convenience
          this.active_style.stroke = 2;
        }
      }
    },

    apply_color_picker: function() {
      var rgb = hsv_to_rgb(this.color_picker_hue/255,
        this.color_picker_saturation/255,
        this.color_picker_value/255);
      var alpha = this.color_picker_opacity/255;

      //console.log("apply_color_picker: ",rgb,alpha);

      this.active_style[this.color_picker_target] = "rgba("+[rgb.r,rgb.g,rgb.b,alpha].join(",")+")";
    },

    extract_color_picker_from_selection: function() {

      if (this.selected_artifacts().length!=1 && this.opened_dialog!="background") return;

      if (this.opened_dialog=="background") {
        this.active_style[this.color_picker_target] = this.active_space.background_color;
      } else {
        if (!this.active_style[this.color_picker_target]) {
          this.active_style[this.color_picker_target] = this.default_style[this.color_picker_target];
        }
      }
      //console.log("active_style for "+this.color_picker_target+": ",this.active_style[this.color_picker_target]);

      var rgba = hex_to_rgba(this.active_style[this.color_picker_target]);

      var hsv = rgb_to_hsv(rgba.r, rgba.g, rgba.b);

      this.color_picker_hue = parseFloat(hsv.h*255);
      this.color_picker_saturation = parseFloat(hsv.s*255);
      this.color_picker_value = parseFloat(hsv.v*255);
      this.color_picker_opacity = parseInt(rgba.a);
      this.color_picker_rgb = rgb_to_hex(rgba.r,rgba.g,rgba.b);
    },

    update_selected_artifacts: function(change_func, override_locked, temporary) {
      var artifacts = this.selected_artifacts(!override_locked);

      if (!artifacts.length) return;

      this.update_artifacts(artifacts, change_func);
      this.update_selection_metrics(null, temporary||false);
    },

    nudge_selected_artifacts: function(dx, dy, event) {
      if (this.present_mode) {
        if (dx>0 || dy>0) {
          this.go_to_next_zone();
          return;
        }
        if (dx<0 || dy<0) {
          this.go_to_previous_zone();
          return;
        }
      }

      if (!this.selected_artifacts().length) {
        if (!$("#space").length) return;
        var el = $("#space")[0];
        el.scrollLeft+=dx*100;
        el.scrollTop +=dy*100;
        return;
      }

      if (this.active_space_is_readonly) return;

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.begin_transaction();

      this.update_selected_artifacts(function(a) {
        return {
          x: a.x+dx,
          y: a.y+dy
        };
      });
    },

    /* -------------------------------------------------------------------- */

    highest_z: function() {
      var z = _.max(this.active_space_artifacts.map(function(a){return a.z||0}));
      if (z<0) z=0;
      if (z>999) z=999;
      return z;
    },

    find_place_for_item: function(width, height) {
      var arts = this.active_space_artifacts;

      var tw = window.innerWidth;
      var th = window.innerHeight;
      var el = $("#space")[0];

      if (!el) return {x:0,y:0,z:1}; // FIXME

      var wrap = $(".wrapper");
      var wx = parseInt(wrap.css("margin-left"));
      var wy = parseInt(wrap.css("margin-top"));

      var x = parseInt((el.scrollLeft + tw/2)/this.viewport_zoom - width/2 - wx/this.viewport_zoom);
      var y = parseInt((el.scrollTop  + th/2)/this.viewport_zoom - height/2 - wy/this.viewport_zoom);

      /*
      if (this.opened_dialog!="none") {
        // we have less visible space if a dialog is obscuring sight
        y/=2;
      }
      */

      var z = this.highest_z()+1;

      if (arts.length==0) return {x:x,y:y};

      x += parseInt(Math.random()*20)-10;
      y += parseInt(Math.random()*20)-10;

      return {x:x,y:y,z:z};
    },

    save_audio_edit: function(a) { // just a helper to be called from view model
      this.opened_dialog = "none";
      this.update_board_artifact_viewmodel(a);
      save_artifact(a);
    },

    save_artifact: function(a, on_success) { // helper to be called from view model
      if (this.guest_nickname) {
        a.editor_name = this.guest_nickname;
      }

      this.update_board_artifact_viewmodel(a);
      save_artifact(a, on_success);
    },

    add_artifact: function (space, item_type, url, evt) {
      this.active_tool = "pointer";
      this.mouse_state = "idle";
      //this.hide_toolbar_artifacts();

      if (!url && (item_type == 'image' || item_type == 'video' || item_type == 'embed')) {
        url = prompt("URL?");
        if (!url || !url.length) return;
      }

      //this.opened_dialog = "none";

      var w=300,h=200;
      var z=this.highest_z()+1;

      // TODO: find solution for legacy types
      mimes = {
        "text": "text/html",
        "note": "text/html",
        "image": "image/jpg",
        "video": "video/mp4"
      };

      var new_item = {
        mime: mimes[item_type],
        description: "",
        payload_uri: url,
        payload_thumbnail_medium_uri: url || null,
        payload_thumbnail_web_uri: url || null,
        space_id: space._id,

        order: this.active_space_artifacts.length+1,
        valign: "middle",
        align: "center"
        //fill_color: "#f8f8f8"
      };

      if (mimes[item_type] == "text/html") {
        new_item.padding_left = 10;
        new_item.padding_top = 10;
        new_item.padding_right = 10;
        new_item.padding_bottom = 10;
        new_item.fill_color = "rgba(255,255,255,1)";
        new_item.description = "<p>Text</p>";
      }

      if (evt) {
        var point = this.cursor_point_to_space(evt);
        point.x-=100;
        point.y-=100;
      } else {
        var point = this.find_place_for_item(w,h);
        z = point.z;
      }

      new_item.x = parseInt(point.x);
      new_item.y = parseInt(point.y);
      new_item.z = z;
      new_item.w = w;
      new_item.h = h;

      if (this.guest_nickname) {
        new_item.editor_name = this.guest_nickname;
      }

      save_artifact(new_item, function(saved_item) {
        this.update_board_artifact_viewmodel(saved_item);
        this.active_space_artifacts.push(saved_item);

        if (!url) {
          this.select(null, saved_item);
        }

        if (item_type.match("text")) {
          this.editing_artifact_id = saved_item._id;
          window.setTimeout(function() {
            // FIXME: replace hack
            var el = $("#artifact-"+saved_item._id+" .text-editing");
            focus_contenteditable(el[0], false);
          },400);
        }
      }.bind(this));
    },

    go_to_first_zone: function() {
      this.discover_zones();
      if (!this.zones.length) return;
      this.zoom_to_zone(this.zones[0]);
    },

    go_to_previous_zone: function() {
      this.discover_zones();
      if (!this.zones.length) return;
      var prev_idx = (this.current_zone_idx-1);
      if (prev_idx<0) prev_idx = this.zones.length-1;
      this.current_zone_idx = prev_idx;
      this.zoom_to_zone(this.zones[this.current_zone_idx]);
    },

    go_to_next_zone: function() {
      this.discover_zones();
      if (!this.zones.length) return;
      var next_idx = ((this.current_zone_idx+1) % this.zones.length);
      this.current_zone_idx = next_idx;
      this.zoom_to_zone(this.zones[this.current_zone_idx]);
    },

    sort_zone_up: function(z) {
      var idx = this.zones.indexOf(z);
      if (idx<1) return;
      var new_zones = _.flatten([this.zones.slice(0,idx-1),[z],this.zones[idx-1],this.zones.slice(idx+1,this.zones.length)]);
      for (var i=0; i<new_zones.length; i++) {
        if (new_zones[i]) {
          if (!new_zones[i].style) new_zones[i].style = {};
          new_zones[i].order = i;
          save_artifact(new_zones[i]);
        }
      }
      this.discover_zones();
    },

    sort_zone_down: function(z) {
      var idx = this.zones.indexOf(z);
      if (idx>=this.zones.length) return;
      var new_zones = _.flatten([this.zones.slice(0,idx),this.zones[idx+1],[z],this.zones.slice(idx+2,this.zones.length)]);
      for (var i=0; i<new_zones.length; i++) {
        if (new_zones[i]) {
          if (!new_zones[i].style) new_zones[i].style = {};
          new_zones[i].order = i;
          save_artifact(new_zones[i]);
        }
      }
      this.discover_zones();
    },

    add_zone: function() {
      var w = 600;
      var h = 600;
      var point = this.find_place_for_item(w,h);

      var a = {
        space_id: this.active_space._id,
        mime: "x-spacedeck/zone",
        description: "Zone "+(this.zones.length+1),
        x: point.x,
        y: point.y,
        w: w,
        h: h,
        z: 0,
        valign: "middle",
        align: "center"
      };

      if (this.guest_nickname) {
        a.editor_name = this.guest_nickname;
      }

      save_artifact(a, function(saved_item) {
        this.update_board_artifact_viewmodel(saved_item);
        this.active_space_artifacts.push(saved_item);

        this.select(null, saved_item);
      }.bind(this));
    },

    add_shape: function(shape_type, evt) {
      var w = 200;
      var h = 200;

      if (shape_type=="cloud") {
        w = 400;
      }

      var point = this.cursor_point_to_space(evt);
      point.z = this.highest_z()+1;

      var a = {
        space_id: this.active_space._id,
        mime: "x-spacedeck/shape",
        description: "",
        x: point.x+w/2,
        y: point.y+h/2,
        z: point.z,
        w: w,
        h: h,
        stroke_color: this.active_style.stroke_color,
        text_color: this.active_style.text_color,
        stroke: this.active_style.stroke,
        fill_color: this.active_style.fill_color,
        shape: shape_type,
        valign: "middle",
        align: "center",
      };

      if (this.guest_nickname) {
        a.editor_name = this.guest_nickname;
      }

      save_artifact(a, function(saved_item) {

        this.update_board_artifact_viewmodel(saved_item);
        this.active_space_artifacts.push(saved_item);

        this.select(null, saved_item);
      }.bind(this));
    },

    cursor_point_to_space: function(evt) {
      if (!evt) return {x:0,y:0};
      if (!$("#space").length) return {x:0,y:0};

      var el = $("#space")[0];
      var pt = parseInt($("#space").css("padding-top"));
      var ml = 0;
      var mt = 0;

      var px = evt.pageX;
      var py = evt.pageY;
      if (!("pageX" in evt) && ("originalEvent" in evt)) {
        px = evt.originalEvent.pageX;
        py = evt.originalEvent.pageY;
      }

      var ox = ((px + el.scrollLeft) - this.bounds_margin_horiz)/this.viewport_zoom;
      var oy = ((py + el.scrollTop) - pt - this.bounds_margin_vert)/this.viewport_zoom;
      return {x: ox, y: oy};
    },

    space_point_to_window: function(x,y) {
      var rx = 0;
      var ry = 0;

      var el = $("#space")[0];
      rx = x*this.viewport_zoom-el.scrollLeft+this.bounds_margin_horiz;
      ry = y*this.viewport_zoom-el.scrollTop+this.bounds_margin_vert;

      return {x:rx,y:ry};
    },

    create_artifact_via_upload: function(evt, file, multiple) {
      if (this.active_space_role=="viewer") {
        return false;
      }

      // 1. create placeholder artifact
      var w=300,h=150;
      var fill="transparent";
      if (file.type.match("audio")) {
        w=600;
        h=150;
        fill="#ffffff";
      }

      var point = this.cursor_point_to_space(evt);

      point.x-=w/2;
      point.y-=h/2;
      if (multiple) {
        point = this.find_place_for_item(w,h);
      }

      var a = {
        space_id: this.active_space._id,
        mime: file.type,
        description: "Uploading…",
        state: "uploading",
        payload_thumbnail_medium_uri: null,
        payload_thumbnail_web_uri: null,
        x: point.x,
        y: point.y,
        w: w,
        h: h,
        z: point.z,
        order: this.active_space_artifacts.length+1,
        fill_color: fill
      }

      this.update_board_artifact_viewmodel(a);

      // 2. post file
      if (this.guest_nickname) {
        a.editor_name = this.guest_nickname;
      }

      save_artifact(a, function(updated_a) {
        a = updated_a;
        this.update_board_artifact_viewmodel(a);
        this.active_space_artifacts.push(a);
        save_artifact_file(a, file, file.name, function(updated_a) {

          console.log("file saved. result: ",updated_a);

          // TODO: generify
          a.payload_uri = updated_a.payload_uri;
          a.payload_thumbnail_web_uri = updated_a.payload_thumbnail_web_uri;
          a.payload_thumbnail_medium_uri = updated_a.payload_thumbnail_medium_uri;
          a.payload_thumbnail_big_uri = updated_a.payload_thumbnail_big_uri;
          a.payload_alternatives = updated_a.payload_alternatives;
          a.mime = updated_a.mime;
          a.x = updated_a.x;
          a.y = updated_a.y;
          a.w = updated_a.w;
          a.h = updated_a.h;
          a.z = updated_a.z;
          a.state = updated_a.state;
          this.update_board_artifact_viewmodel(a);

        }.bind(this), null, function(e) {
          // upload progress
          var progress = e.loaded/e.total;

          if (progress===1) {
            a.description = "Converting Media…";
          } else {
            a.description = "Upload "+parseInt(progress*100)+"%";
          }
          this.update_board_artifact_viewmodel(a);
          a.view.progress = parseInt(progress*100);
        }.bind(this));
      }.bind(this), this.display_saving_error);
    },

    delete_selected_artifacts: function(evt, skip_deselect) {
      if (!this.active_space) return;

      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      this.begin_transaction();

      var ids = this.selected_artifacts().map(function(a){return a._id});
      var backup = [];
      var backup_ids = [];

      if (ids.length>1 && !skip_deselect) {
        if (!confirm("Delete "+ids.length+" items?")) return;
      }

      for (var i=0; i<ids.length; i++) {
        if (this.selected_artifacts_dict[ids[i]]) {
          var id = ids[i];
          var a = this.find_artifact_by_id(id);
          if (a) {
            backup.push(a);
            backup_ids.push(id);
            delete_artifact(a);
          }

          var idx = this.active_space_artifacts.indexOf(a);
          this.active_space_artifacts.splice(idx, 1);
        }
      }

      this.push_to_undo({
        action: "delete",
        artifact_ids: backup_ids,
        snapshot: backup
      });

      if (!skip_deselect) {
        this.deselect();
      }
    },

    find_artifact_by_id: function(id) {
      var ars = this.active_space_artifacts;
      for (var i=0; i<ars.length; i++) {
        var a = ars[i];
        if (a._id==id) return a;
      }
      return null;
    },

    selected_artifacts: function(exclude_locked) {
      if (!this.active_space || !this.active_space_artifacts) return [];
      return this.active_space_artifacts.filter(function(a) {
        var sel = this.artifact_is_selected(a);
        if (sel && a.locked) return !exclude_locked;
        return sel;
      }.bind(this));
    },

    delayed_edit_artifact: function() {
      var a = this.selected_artifacts()[0];

      var el = $("#ios-focuser-"+a._id);
      el.focus();
      el.select();

      this.toggle_selected_artifact_editing(true, true);
    },

    toggle_selected_artifact_editing: function(force_on, delayed) {
      var a = this.selected_artifacts()[0];

      if (!a) {
        this.editing_artifact_id = null;
        return;
      }

      if (this.editing_artifact_id == a._id && !force_on) {
        this.editing_artifact_id = null;
        return;
      }

      if (a.locked) return;

      if (!_.include(["text/html","x-spacedeck/shape","x-spacedeck/zone"],a.mime)) return;

      if (this.editing_artifact_id == a._id) return;

      this.editing_artifact_id = a._id;

      var ms = 100;
      if (delayed) ms = 500; // wait for slow devices

      window.setTimeout(function(){
        var el = $("#artifact-"+a._id+" .text-editing");
        if (el[0]) {
          // tuned weirdness for firefox, chrome + ios safari
          //el.select();
          focus_contenteditable(el[0], true);
        } else {
          // one more try (slow device)
          window.setTimeout(function(){
            var el = $("#artifact-"+a._id+" .text-editing");
            //el.select();
            focus_contenteditable(el[0], true);
          },ms);
        }
      },ms);
    },

    clear_formatting_walk: function(el,cmd,arg1,arg2) {
      if (el && el.style) {
        if (cmd == "preciseFontSize") {
          el.fontSize = null;
        } else if (cmd == "letterSpacing") {
          el.letterSpacing = null;
        } else if (cmd == "lineHeight") {
          el.lineHeight = null;
        } else if (cmd == "fontName") {
          el.fontFamily = null;
        } else if (cmd == "fontWeight") {
          el.fontWeight = null;
          el.fontStyle = null;
        } else if (cmd == "bold") {
          el.fontWeight = null;
        } else if (cmd == "italic") {
          el.fontStyle = null;
        } else if (cmd == "underline") {
          el.textDecoration = null;
        } else if (cmd == "strikeThrough") {
          el.textDecoration = null;
        } else if (cmd == "forecolor") {
          el.color = null;
        }
      }

      if (el && el.childNodes) {
        for (var i=0; i<el.childNodes.length; i++) {
          this.clear_formatting_walk(el.childNodes[i],cmd,arg1,arg2);
        }
      }
    },

    apply_formatting: function(evt,cmd,arg1,arg2) {
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      if (this.skip_formatting) return;

      if (cmd=='createlink') {
        arg1 = prompt("Link URL?");
        if (!arg1) return;
      }

      var selected = this.selected_artifacts();
      var collapsed = false;

      if (!window.selection || window.selection.type == "Caret" || window.selection.type == "None") {
        collapsed = true;
      }

      // (selected.length==1 && (!this.editing_artifact_id))
      if (!this.editing_artifact_id || cmd == "preciseFontSize" || cmd == "forecolor") {
        for (var i=0; i<selected.length; i++) {
          var a = selected[i];
          var dom = $("<div>"+a.description+"</div>")[0];
          var el = dom.firstChild;

          do {
            // clear nested styles first
            if (el && el.childNodes) {
              for (var j=0; j<el.childNodes.length; j++) {
                this.clear_formatting_walk(el.childNodes[j],cmd,arg1,arg2);
              }
            }

            // toggle new style
            if (el && el.style) {
              if (cmd == "preciseFontSize") {
                if (arg1 == this.default_style.font_size+"px") {
                  el.style.fontSize = null;
                } else {
                  el.style.fontSize = arg1;
                }
              } else if (cmd == "letterSpacing") {
                if (arg1 == this.default_style.letter_spacing+"px") {
                  el.style.letterSpacing = null;
                } else {
                  el.style.letterSpacing = arg1;
                }
              } else if (cmd == "lineHeight") {
                if (arg1 == this.default_style.line_height+"em") {
                  el.style.lineHeight = null;
                } else {
                  el.style.lineHeight = arg1;
                }
              } else if (cmd == "fontName") {
                el.style.fontFamily = arg1;
              } else if (cmd == "fontWeight") {
                el.style.fontWeight = arg1;
                el.style.fontStyle = arg2;
              } else if (cmd == "bold") {
                el.style.fontWeight = (el.style.fontWeight!="bold"?"bold":"normal");
              } else if (cmd == "italic") {
                el.style.fontStyle = (el.style.fontStyle!="italic"?"italic":"normal");
              } else if (cmd == "underline") {
                el.style.textDecoration = (el.style.textDecoration!="underline"?"underline":"none");
              } else if (cmd == "strikeThrough") {
                el.style.textDecoration = (el.style.textDecoration!="line-through"?"line-through":"none");
              } else if (cmd == "forecolor") {
                el.style.color = arg1;
              }
            }
          } while (el && (el = el.nextSibling));

          if (a.description!=dom.innerHTML) {
            a.description = dom.innerHTML;

            this.update_board_artifact_viewmodel(a);
            this.queue_artifact_for_save(a);

            if (this.editing_artifact_id) {
              var a = this.find_artifact_by_id(this.editing_artifact_id);
              var medium = this.medium_for_object[a._id];
              if (medium && a) {
                medium.value(a.description);
              }
            }
          }
        }

      } else if (this.editing_artifact_id) {
        // text level selection
        var a = this.find_artifact_by_id(this.editing_artifact_id);
        var medium = this.medium_for_object[a._id];

        if (medium && a) {
          medium.focus();
          medium.element.focus();
          medium.invokeElement(cmd);

          a.description = medium.value();
          this.queue_artifact_for_save(a);
        }
      }

      this.extract_text_format_from_selection();
    },

    remove_link_from_selected_artifacts: function() {
      this.update_selected_artifacts(function(a) {
        return {link_uri: ""};
      });
    },

    create_link_on_selected_artifacts: function() {
      var def = "";
      var sa = this.selected_artifacts();
      if (sa.length>=1) {
        if (sa[0].meta && sa[0].meta.link_uri) {
          def = sa[0].meta.link_uri;
        }
      }

      var insert_link_url = prompt("URL:",def);

      this.update_selected_artifacts(function(a) {
        var update = {link_uri: insert_link_url};

        if (a.payload_uri && a.payload_uri.match("webgrabber")) {
          var enc_uri = encodeURIComponent(btoa(insert_link_url));
          var thumb_uri = ENV.apiEndpoint + "/api/webgrabber/"+enc_uri;

          update.payload_uri = thumb_uri;
          update.payload_thumbnail_web_uri = thumb_uri;
          update.payload_thumbnail_medium_uri = thumb_uri;
          update.payload_thumbnail_big_uri = thumb_uri;
        }

        return update;
      });

      this.opened_dialog = "none";
    },

    clone_artifact: function(a,dx,dy,on_success) {
      var copy = _.cloneDeep(a);
      delete copy["$index"];
      delete copy["_id"];

      if (dx) copy.x += dx;
      if (dy) copy.y += dy;

      copy.order = this.active_space_artifacts.length+1;

      if (this.guest_nickname) {
        copy.editor_name = this.guest_nickname;
      }

      copy.space_id = this.active_space._id;

      save_artifact(copy, function(saved) {
        this.update_board_artifact_viewmodel(saved);
        this.active_space_artifacts.push(saved);
        if (on_success) {
          on_success(saved);
        } else {
          this.select(null,saved);
        }
      }.bind(this));
      return copy;
    },

    lock_selected_artifacts: function() {
      this.update_selected_artifacts(function(a) {
        return {locked: true};
      }, true);
    },

    unlock_selected_artifacts: function() {
      this.update_selected_artifacts(function(a) {
        return {locked: false};
      }, true);
    },

    duplicate_selected_artifacts: function() {
      var arts = this.selected_artifacts();
      for (var i=0; i<arts.length; i++) {
        var a = arts[i];
        var cloned = this.clone_artifact(a,50,50);
      }
    },

    copy_selected_artifacts_to_clipboard: function() {
      if ('ontouchstart' in window) return; // don't do this on touch devices

      $("#space-clipboard").focus();
      $("#space-clipboard").select();
    },

    handle_section_click: function(evt) {
      if (evt.target == evt.currentTarget) {
        this.deselect();
      }
    },

    handle_space_doubleclick: function(evt) {
      if (this.selected_artifacts().length) return;
      if (this.guest_nickname) return;
      if (this.active_space && this.active_space.access_mode == "public") return;

      //this.add_artifact(this.active_space, "text", null, evt);
    },

    handle_body_click: function(evt) {
      if (this.active_view == "space") {
        this.handle_section_click(evt);
      }
      this.close_dropdown(evt);
    },

    extract_text_format_from_selection: function() {
      if (!window.selection) return;

      var parents = $(window.selection.baseNode).parents().toArray();

      this.detected_text_formats = {};
      var formats = {
        "p":"Paragraph",
        "h1":"Headline 1",
        "h2":"Headline 2",
        "h3":"Headline 3",
        "h4":"Headline 4",
        "h5":"Headline 5",
        "h6":"Headline 6",
        "ul":"Bullet List",
        "ol":"Numbered List",
        "blockquote":"Blockquote"
      };

      for (var i=0; i<parents.length; i++) {
        var p = parents[i];
        if (p.contentEditable=="true") break;
        var nn = p.nodeName.toLowerCase();
        if (formats[nn]) {
          this.detected_text_formats[nn] = true;
          this.active_text_format_name = formats[nn];
        }
      }
    },

    // called on artifact keyup
    save_edited_artifact_text: function(evt) {

      // FIXME
      if (this.editing_artifact_id) {

        //var scribe = _scribe_handle_for_object[this.editing_artifact_id];
        var artifact = this.find_artifact_by_id(this.editing_artifact_id);
        if (artifact) {
          //artifact.description = scribe.getHTML();
          this.queue_artifact_for_save(artifact);
        }

        this.extract_text_format_from_selection();
      }

    },

    handle_section_paste: function(evt) {
      if (this.editing_artifact_id) return;
      var pastedText = null;

      try {
        pastedText = evt.clipboardData.getData('text/plain');
      } catch (e) {
      }

      if (!pastedText) return;

      this.insert_embedded_artifact(pastedText);
    },

    insert_embedded_artifact: function(text) {
      var space = this.active_space;
      if (!space) return;

      if (text[0]=='[' || text[0]=='{') {
        // might be json
        try {
          parsed = JSON.parse(text);
          if (text[0]=='{') parsed = [parsed];

          this.deselect();

          for (var i=0; i<parsed.length; i++) {
            if (parsed[i].mime) {
              var z = this.highest_z()+1;
              if(!this.isShift) {
                if (parsed.length==1) {
                  var w = parsed[i].w;
                  var h = parsed[i].h;
                  var point = this.find_place_for_item(w,h);
                  parsed[i].x = point.x;
                  parsed[i].y = point.y;
                  parsed[i].z = point.z;
                } else {
                  parsed[i].x = parsed[i].x+100;
                  parsed[i].y = parsed[i].y+100;
                  parsed[i].y = parsed[i].z+z;
                }
              }
              this.clone_artifact(parsed[i], 0,0, function(a) {
                this.multi_select([a]);
              }.bind(this));
            }
          }
          return;
        } catch(e) {
          // not json
        }
      }

      if (text.match(/^http[s]*\:\/\//)) {
        // crude url matching
        this.create_artifact_via_embed_url(text);
        return;
      }
    },

    create_artifact_via_embed_url: function(url) {
      this.close_modal();

      var point = this.find_place_for_item(200,200);
      var z = this.highest_z()+1;

      var a = {
        space_id: this.active_space._id,
        mime: "image/png",
        description: url,
        state: "uploading",
        x: point.x,
        y: point.y,
        w: 200,
        h: 200,
        z: z,
        order: this.active_space_artifacts.length
      }

      var metadata = parse_link(url)

      if (!metadata) {
        return;
      }

      if (metadata.type == "unknown") {
        var enc_uri = encodeURIComponent(btoa(url));

        a.meta = {
          link_uri: url
        }

        if (this.guest_nickname) {
          a.editor_name = this.guest_nickname;
        }

        // step 1: create placeholder
        save_artifact(a, function(saved_a) {
          this.update_board_artifact_viewmodel(saved_a);
          this.active_space_artifacts.push(saved_a);

          var thumb_uri = ENV.apiEndpoint + "/api/webgrabber/"+enc_uri;

          // step 2: push payload_uri for processing
          saved_a.state = "idle";
          saved_a.payload_uri = thumb_uri;

          saved_a.payload_thumbnail_web_uri = thumb_uri;
          saved_a.payload_thumbnail_medium_uri = thumb_uri;
          saved_a.payload_thumbnail_big_uri = thumb_uri;

          save_artifact(saved_a, function(saved_a2) {
            this.update_board_artifact_viewmodel(saved_a);
          }.bind(this));

        }.bind(this));

        return;
      }

      var w = metadata.thumbnail_width || 200;
      var h = metadata.thumbnail_height || 200;

      if (w<200) w = 200;
      if (h<200) h = 200;

      if (metadata.provider_name == "soundcloud") {
        w = 500;
        h = 150;
      }

      a = _.extend(a, {
        mime: "oembed/"+metadata.type+"-"+metadata.provider_name,
        description: metadata.url || url,
        //payload_uri: metadata.url || url,
        payload_thumbnail_medium_uri: metadata.thumbnail_url,
        payload_thumbnail_web_uri: metadata.thumbnail_url,
        state: "idle",
        title: metadata.title,
        link_uri: metadata.url || url,
        x: point.x - w/2,
        y: point.y - h/2,
        w: w,
        h: h
      });

      if (this.guest_nickname) {
        a.editor_name = this.guest_nickname;
      }

      save_artifact(a, function(saved_a) {
        this.update_board_artifact_viewmodel(saved_a);
        this.active_space_artifacts.push(saved_a);
      }.bind(this));
    },

    create_artifact_via_payload_url: function(type, url) {
      this.add_artifact(this.active_space, type, url, null);
    },

    handle_touch_select_background_image: function() {
      $('#background-uploader').click();
    },

    handle_insert_image_url: function(url) {
      if (!url || !url.length) {
        $("#image_file_upload").click(); // redirect to file upload
        return;
      }

      this.create_artifact_via_payload_url("image", url);
      this.insert_image_url = "";
      // this.opened_dialog = "none";
    },

    handle_insert_video_url: function(url) {

      if (!url.length) {
        $("#video_file_upload").click(); // redirect to file upload
        return;
      }

      var object = parse_link(url);

      if (object) {
        this.create_artifact_via_embed_url(url);
      } else {
        this.create_artifact_via_payload_url("video", url);
      }

      this.insert_video_url = "";
      //this.opened_dialog = "none";
    },

    handle_insert_audio_url: function(url) {

      if (!url.length) {
        $("#audio_file_upload").click(); // redirect to file upload
        return;
      }

      var object = parse_link(url);

      if (object) {
        this.create_artifact_via_embed_url(url);
      } else {
        this.create_artifact_via_payload_url("audio", url);
      }
      this.insert_audio_url = "";
    },

    handle_generic_file_upload: function(evt) {
      var files = evt.target.files;
      this.opened_dialog = "none";

      if (files && files.length) {
        for (var i=0; i<files.length; i++) {
          var file = files[i];
          this.create_artifact_via_upload(null, file, true);
        }
      }
    },

    handle_image_file_upload: function(evt) {
      this.handle_generic_file_upload(evt);
    },
    handle_video_file_upload: function(evt) {
      this.handle_generic_file_upload(evt);
    },
    handle_audio_file_upload: function(evt) {
      this.handle_generic_file_upload(evt);
    },

    handle_section_background_upload: function(evt) {
      var f = evt.target.files[0];
      this.space_background_uploading = true;
      save_space_background_file(this.active_space, f, function(space) {
        this.active_space = space;
        this.space_background_uploading = false;
      }.bind(this));
    },

    remove_section_background: function() {
      this.active_space.background_uri = null;
      save_space(this.active_space);
    },

    show_toolbar_props: function() {
      if (this.selection_metrics.count==0) {
        this.toolbar_lock_in = false;
        return;
      }
      arts = this.selected_artifacts();
      // check if selected artifacts are all from the same user
      let same_user = true;
      for (var i=0;i<arts.length; i++) {
        if (arts[i].mime=="x-spacedeck/zone") return;
        if (arts[i].user_id!==this.user._id) same_user = false;
      }
      this.toolbar_lock_in = same_user;
      this.toolbar_props_in = true;
    },

    hide_toolbar_props: function() {
      // FIXME test
      //this.toolbar_props_in = false;
    },

    show_toolbar_artifacts: function(x,y) {
      this.toolbar_artifacts_in = true;
    },

    hide_toolbar_artifacts: function() {
      this.toolbar_artifacts_in = false;
    },

    deactivate_tool: function(evt) {
      this.active_tool = "pointer";
    },

    start_adding_artifact: function(evt) {
      evt = fixup_touches(evt);
    },

    start_adding_note: function(evt) {
      this.deselect();
      if (this.active_tool == "note") {
        this.active_tool = "pointer";
      } else {
        this.active_tool = "note";
      }
      this.opened_dialog = "none";
    },

    start_pan: function(evt) {
      this.deselect();
      if (this.active_tool == "pan") {
        this.active_tool = "pointer";
      } else {
        this.active_tool = "pan";
      }
      this.opened_dialog = "none";

    },

    start_drawing_scribble: function(evt) {
      this.deselect();
      if (this.active_tool == "scribble") {
        this.active_tool = "pointer";
      } else {
        this.active_tool = "scribble";
      }
      this.opened_dialog = "none";
    },

    start_drawing_arrow: function(evt) {
      this.deselect();
      this.active_tool = "arrow";
      this.opened_dialog = "none";
    },

    start_drawing_line: function(evt) {
      this.deselect();
      this.active_tool = "line";
      this.opened_dialog = "none";
    },

    adjust_bounds_zoom: function() {
      if (!this.active_space) return;

      this.bounds_zoom = this.viewport_zoom;

      var eff_w = this.active_space.width*this.viewport_zoom;
      var eff_h = this.active_space.height*this.viewport_zoom;

      if (window.innerWidth>eff_w) {
        // horizontal centering
        this.bounds_margin_horiz = (window.innerWidth-eff_w)/2;
      } else {
        this.bounds_margin_horiz = 0;
      }

      if (window.innerHeight-80>eff_h) {
        // horizontal centering
        this.bounds_margin_vert = (window.innerHeight-eff_h)/2-80;
      } else {
        this.bounds_margin_vert = 0;
      }
    },

    zoom_to_original: function() {
      var old_zoom = this.viewport_zoom;
      this.viewport_zoom = 1;
      this.viewport_zoom_percent = parseInt(this.viewport_zoom*100);
      this.adjust_bounds_zoom();
      this.zoom_adjust_scroll(this.viewport_zoom/old_zoom);
    },

    zoom_to_fit: function() {
      var er = this.enclosing_rect(this.active_space_artifacts);

      if (!er) return;

      var pad = 200;
      er.x1-=pad;
      er.y1-=pad-100;
      er.x2+=pad;
      er.y2+=pad+100;

      this.zoom_to_rect(er, 1);
    },

    zoom_to_zone: function(z) {
      if (!$("#space").length) return;

      var er = this.enclosing_rect([z]);

      var el = $("#space")[0];
      var cur_r = {
        x1: el.scrollLeft/this.viewport_zoom,
        y1: el.scrollTop/this.viewport_zoom,
        x2: (el.scrollLeft+window.innerWidth)/this.viewport_zoom,
        y2: (el.scrollTop+window.innerHeight)/this.viewport_zoom
      };

      var pad = 10;
      er.x1-=pad;
      er.y1-=pad;
      er.x2+=pad;
      er.y2+=pad;

      if (!this.animation_running) {
        this.animation_running = true;
        this.animate_zoom_to_rect(er, 200, cur_r);

        this.current_zone_idx = this.zones.indexOf(z);
      }
    },

    zoom_to_rect: function(er, max_zoom) {
      if (!$("#space").length) return;

      var el = $("#space")[0];
      var w = er.x2-er.x1;
      var h = er.y2-er.y1;

      if (w>h) {
        this.viewport_zoom = window.innerWidth/w;

        if (window.innerHeight < h*this.viewport_zoom) {
          this.viewport_zoom = window.innerHeight/h;
        }
      } else {
        this.viewport_zoom = window.innerHeight/h;

        if (window.innerWidth < w*this.viewport_zoom) {
          this.viewport_zoom = window.innerWidth/w;
        }
      }

      if (max_zoom) {
        if (this.viewport_zoom>max_zoom) this.viewport_zoom = max_zoom;
      }

      if (this.viewport_zoom<0.05) this.viewport_zoom = 0.05;

      this.viewport_zoom_percent = parseInt(this.viewport_zoom*100);
      this.adjust_bounds_zoom();

      if (!el) return;

      var animate = function() {
        el.scrollTop = (er.y1+(h/2))*this.viewport_zoom-window.innerHeight/2;
        el.scrollLeft = (er.x1+(w/2))*this.viewport_zoom-window.innerWidth/2;
        this.handle_scroll();
      }.bind(this);

      if ("requestAnimationFrame" in window) {
        window.requestAnimationFrame(animate);
      } else {
        animate();
      }
    },

    animate_zoom_to_rect: function(target_r, duration, cur_r, elapsed) {
      if (!$("#space").length) return;

      var el = $("#space")[0];
      var anim_res = 20;
      if (!elapsed) elapsed = 0;

      if (duration>elapsed) {
        window.setTimeout(function() {
          this.animate_zoom_to_rect(target_r, duration, cur_r, elapsed+anim_res);
        }.bind(this), anim_res);

        /*var dx = (el.scrollLeft-ncx)/anim_res;
        var dy = (el.scrollLeft-ncy)/anim_res;

        el.scrollLeft += dx;
        el.scrollTop += dy;*/

        // interpolate
        var dx1 = ((target_r.x1-cur_r.x1)/duration)*elapsed;
        var dx2 = ((target_r.x2-cur_r.x2)/duration)*elapsed;
        var dy1 = ((target_r.y1-cur_r.y1)/duration)*elapsed;
        var dy2 = ((target_r.y2-cur_r.y2)/duration)*elapsed;

        var step_r = {
          x1: cur_r.x1+dx1,
          x2: cur_r.x2+dx2,
          y1: cur_r.y1+dy1,
          y2: cur_r.y2+dy2
        };

        /*console.log("cur_r: ",cur_r);
        console.log("target_r: ",target_r);
        console.log("step_r: ",step_r);*/

        this.zoom_to_rect(step_r);
      } else {
        // done
        this.zoom_to_rect(target_r);
        this.animation_running = false;
      }
    },

    zoom_to_point: function(p,amount) {
      var el = $("#space")[0];

      var sx = el.scrollLeft/this.viewport_zoom;
      var sy = el.scrollTop/this.viewport_zoom;
      var ww = window.innerWidth/(this.viewport_zoom);
      var wh = window.innerHeight/(this.viewport_zoom);

      var oxx = (p.x-(sx+ww/2))*amount;
      var oyy = (p.y-(sy+wh/2))*amount;
      var ox = -oxx;
      var oy = -oyy;

      var r = {
        x1: p.x-(ww/2)*amount + ox,
        y1: p.y-(wh/2)*amount + oy,
        x2: p.x+(ww/2)*amount + ox,
        y2: p.y+(wh/2)*amount + oy
      };

      this.zoom_to_rect(r,2);
    },

    throttled_zoom_to_point: _.throttle(function(p,a){
      this.zoom_to_point(p,a);
    }, 50),

    zoom_to_cursor: function(evt,amount) {
      var point = this.cursor_point_to_space(evt);
      this.throttled_zoom_to_point.bind(this)(point,amount);
    },

    zoom_adjust_scroll: function(f) {
      var adjust_scroll = function() {
        if (!$("#space").length) return;
        if (!this.active_space || !this.active_space_loaded) return;

        var el = $("#space")[0];

        var eff_w = this.active_space.width*this.viewport_zoom;
        var eff_h = this.active_space.height*this.viewport_zoom;

        var sx = el.scrollLeft;
        var sy = el.scrollTop;

        var cx = window.innerWidth/2;
        var cy = window.innerHeight/2;

        var ncx = f*(sx+cx)-cx;
        var ncy = f*(sy+cy)-cy;

        if (eff_w<window.innerWidth) ncx = 0;

        if (eff_h<window.innerHeight) ncy = 0;

        el.scrollLeft = ncx;
        el.scrollTop = ncy;

        this.handle_scroll();
      };

      if ("requestAnimationFrame" in window) {
        window.requestAnimationFrame(adjust_scroll.bind(this));
      } else {
        adjust_scroll();
      }
    },

    zoom_in: function() {
      if (!this.viewport_zoom) this.viewport_zoom = 1;
      var old_zoom = this.viewport_zoom;

      this.viewport_zoom *= 1.5;
      if (this.viewport_zoom>=2) {
        this.viewport_zoom = 2;
      }
      this.viewport_zoom_percent = parseInt(this.viewport_zoom*100);
      this.adjust_bounds_zoom();

      this.zoom_adjust_scroll(this.viewport_zoom/old_zoom);
    },

    zoom_out: function() {
      if (!this.viewport_zoom) this.viewport_zoom = 1;
      var old_zoom = this.viewport_zoom;

      this.viewport_zoom /= 1.5;
      if (this.viewport_zoom<0.05) {
        this.viewport_zoom = 0.05;
      }
      this.viewport_zoom_percent = parseInt(this.viewport_zoom*100);
      this.adjust_bounds_zoom();

      this.zoom_adjust_scroll(this.viewport_zoom/old_zoom);
    },

    activate_pan_tool: function(evt) {
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }
      this.active_tool = "pan";

      if (this.stop_pan_timeout) {
        window.clearTimeout(this.stop_pan_timeout);
      }
      // pan exit hack
      this.stop_pan_timeout = window.setTimeout(function () {
        if (this.active_tool == "pan") {
          this.active_tool = "pointer";
        }
      }.bind(this),500);
    },

    handle_data_drop: function(evt) {
      if (this.active_space_role=="viewer") {
        return false;
      }

      var json = evt.dataTransfer.getData('application/json');
      var dest_section = this.active_space;
      var files = evt.dataTransfer.files;

      if (files && files.length) {
        for (var i=0; i<files.length; i++) {
          var file = files[i];
          this.create_artifact_via_upload(evt, file, (files.length>1));
        }
      } else {
        var json = evt.dataTransfer.getData('application/json');

        if (json) {
          var parsed = JSON.parse(json);
          delete parsed._id;
          parsed.space_id = this.active_space._id;

          var w = 300;
          var h = 200;
          if (parsed.board && parsed.w && parsed.h) {
            w = parsed.w;
            h = parsed.h;
          }

          var point = this.cursor_point_to_space(evt);
          point.x-=w/2;
          point.y-=h/2;

          parsed.board = {
            x: point.x,
            y: point.y,
            w: w,
            h: h,
            z: 20
          };

          if (this.guest_nickname) {
            parsed.editor_name = this.guest_nickname;
          }

          save_artifact(parsed, function(saved_a) {
            this.update_board_artifact_viewmodel(saved_a);
            this.active_space_artifacts.push(saved_a);
          }.bind(this));
          return;
        }

        var html = evt.dataTransfer.getData('text/html');

        if (html) {
          var rx = /src="([^"]+)"/g;
          var m = rx.exec(html);
          if (m) {
            this.add_artifact(this.active_space, "image", m[1], evt);
          }
        }
      }
    },

    clear_search_results: function() {
      this.image_search_results = [];
      this.audio_search_results = [];
      this.video_search_results = [];
    },

    download_selected_artifacts: function() {
      var arts = this.selected_artifacts();
      if (arts.length!=1) return;

      if (arts[0].payload_uri) {
        try {
          window.open(arts[0].payload_uri);
        } catch (e) {
          // could not open window
        }
      }
    }
  }
}
