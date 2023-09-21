
/*
  Spacedeck Whiteboard Directive
  This module registers a custom Vue directive that handles Whiteboard sections.
*/

function setup_whiteboard_directives() {
  var mode_touch = false;

  if ('ontouchstart' in window) {
    mode_touch = true;
    var edown = "touchstart";
    var emove = "touchmove";
    var eup = "touchend";
  } else {
    var edown = "mousedown";
    var emove = "mousemove";
    var eup = "mouseup";
  }

  // detect first touch event
  window.addEventListener('touchstart', function on_first_touch() {
    mode_touch = true;
    window.removeEventListener('touchstart', on_first_touch, false);
  }, false);

  Vue.directive('sd-whiteboard', {
    bind: function () {
      var el = this.el;

      $(el).on(edown, ".artifact", this.handle_mouse_down_artifact.bind(this));
      $(el).on("dblclick", ".artifact", this.handle_double_click_artifact.bind(this));
      $(el).on("keyup", ".artifact", this.handle_key_up_artifact.bind(this));
      $(el).on("keydown", ".artifact", this.handle_key_down_artifact.bind(this));
      $(el).bind("touchstart", this.handle_mouse_down_space.bind(this));
      $(el).bind("touchmove", this.handle_mouse_move.bind(this));
      $(el).bind("touchend", this.handle_mouse_up_space.bind(this));
      $(el).bind("mousedown", this.handle_mouse_down_space.bind(this));
      $(el).bind("mousemove", this.handle_mouse_move.bind(this));
      $(el).bind("mouseup", this.handle_mouse_up_space.bind(this));

      $(el).bind("wheel", this.handle_wheel_space.bind(this));

      $(document.body).bind("mouseleave", this.handle_mouse_leave.bind(this));

      $(el).find(".handle.resize-nw").bind(edown, function(e){this.handle_transform_mouse_down(e,1,1)}.bind(this));
      $(el).find(".handle.resize-n").bind(edown, function(e){this.handle_transform_mouse_down(e,0.5,1)}.bind(this));
      $(el).find(".handle.resize-ne").bind(edown, function(e){this.handle_transform_mouse_down(e,0,1)}.bind(this));
      $(el).find(".handle.resize-e").bind(edown, function(e){this.handle_transform_mouse_down(e,0,0.5)}.bind(this));
      $(el).find(".handle.resize-se").bind(edown, function(e){this.handle_transform_mouse_down(e,0,0)}.bind(this));
      $(el).find(".handle.resize-s").bind(edown, function(e){this.handle_transform_mouse_down(e,0.5,0)}.bind(this));
      $(el).find(".handle.resize-sw").bind(edown, function(e){this.handle_transform_mouse_down(e,1,0)}.bind(this));
      $(el).find(".handle.resize-w").bind(edown, function(e){this.handle_transform_mouse_down(e,1,0.5)}.bind(this));

      $(el).find(".edge-handle.resize-n").bind(edown, function(e){this.handle_transform_mouse_down(e,0.5,1)}.bind(this));
      $(el).find(".edge-handle.resize-s").bind(edown, function(e){this.handle_transform_mouse_down(e,0.5,0)}.bind(this));
      $(el).find(".edge-handle.resize-e").bind(edown, function(e){this.handle_transform_mouse_down(e,0,0.5)}.bind(this));
      $(el).find(".edge-handle.resize-w").bind(edown, function(e){this.handle_transform_mouse_down(e,1,0.5)}.bind(this));

      $(el).on(edown, ".vector-handle", function(e){this.handle_vector_transform_mouse_down(e)}.bind(this));

      var $scope = this.vm.$root;

      this.space_zoom = 1;
      this.artifacts_before_transaction = [];
      $scope.active_tool = "pointer";
    },
    update: function () {
    },
    unbind: function () {
      // do clean up work
      // e.g. remove event listeners added in bind()

      var el = this.el;
      $(el).off(edown+" "+emove+" "+eup+" "+"keyup keydown mouseleave");
      $(document.body).unbind("mouseleave");
    },

    handle_key_down_artifact: function(evt) {
      var $scope = this.vm.$root;
    },

    handle_key_up_artifact: function(evt) {
      var $scope = this.vm.$root;
    },

    handle_mouse_down_artifact: function(evt) {
      var $scope = this.vm.$root;

      if (!$scope.editing_artifact_id) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      if ($scope.active_tool == "zoom") return;

      if (evt.which == 2) {
        // middle mouse button
        this.handle_mouse_down_space(evt);
        return;
      }

      if ($scope.active_tool == "note") {
        this.handle_mouse_down_space(evt, true);
        return;
      }

      var a = $scope.find_artifact_by_id(evt.currentTarget.id.replace("artifact-",""));

      if ($scope.active_tool == "eyedrop") {
        var arts = $scope.selected_artifacts();
        if (!$scope.is_selected(a) && arts.length > 0) {
          // copy style from clicked artifact to selected artifacts
          $scope.begin_transaction();

          $scope.update_selected_artifacts(function(selected_artifact) {
            selected_artifact.style = _.clone(a.style);
          });

          $scope.active_tool = "pointer";
          return;
        }
      }

      if ($scope.active_tool == "pan") {
        this.start_pan(evt);
        return;
      }

      if ($scope.active_tool == "pointer") {
        if (!$scope.is_selected(a) || evt.shiftKey) {
          this.select(evt,a);
        }

        // copy via alt+move
        if (evt.altKey) {
          a = $scope.clone_artifact(a);
          this.select(evt,a);
        }
      }

      $scope.begin_transaction();

      var cursor = this.cursor_point_to_space(evt);
      $scope.mouse_ox = cursor.x;
      $scope.mouse_oy = cursor.y;
      $scope.mouse_moved = false;
      this.mouse_state = "move";
      evt.stopPropagation();
    },

    handle_double_click_artifact: function(evt) {
      var $scope = this.vm.$root;

      var a = $scope.find_artifact_by_id(evt.currentTarget.id.replace("artifact-",""));
      if (!a) return;

      if (a.payload_uri) {
        $scope.download_selected_artifacts();
      }

      $scope.toggle_selected_artifact_editing(true);
    },

    handle_transform_mouse_down: function(evt,origin_x,origin_y) {
      evt.stopPropagation();
      evt.preventDefault();

      var $scope = this.vm.$root;

      $scope.begin_transaction();

      var cursor = this.cursor_point_to_space(evt);
      this.mouse_state = "transform";
      $scope.mouse_ox = cursor.x;
      $scope.mouse_oy = cursor.y;
      $scope.transform_ox = origin_x;
      $scope.transform_oy = origin_y;
    },

    handle_vector_transform_mouse_down: function(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      var $scope = this.vm.$root;

      var idx = parseInt($(evt.currentTarget).attr("data-idx"));
      $scope.selected_control_point_idx = idx;

      $scope.begin_transaction();
      var cursor = this.cursor_point_to_space(evt);
      this.mouse_state = "vector_transform";
      $scope.mouse_ox = cursor.x;
      $scope.mouse_oy = cursor.y;
      //$scope.transform_ox = origin_x;
      //$scope.transform_oy = origin_y;
    },

    handle_wheel_space: function(evt) {
      var $scope = this.vm.$root;

      if (!evt.ctrlKey && !evt.shiftKey) return;

      evt.preventDefault();
      evt.stopPropagation();

      var amount = 1;
      var dy = evt.originalEvent.deltaY;
      if (dy>0) {
        amount=1.2;
        if ($scope.viewport_zoom<=0.05) return false;
      } else if (dy<0) {
        amount=0.9;
        if ($scope.viewport_zoom>=2) return false;
      } else {
        return false;
      }
      $scope.zoom_to_cursor(evt,amount);
    },

    handle_mouse_down_space: function(evt, force) {
      if (!force && evt.which != 2) {
        if (evt.target != evt.currentTarget && !_.include(["wrapper"],evt.target.className)) return;
      }

      var $scope = this.vm.$root;

      $scope.opened_dialog="none";

      var cursor = this.cursor_point_to_space(evt);
      $scope.mouse_ox = cursor.x;
      $scope.mouse_oy = cursor.y;

      if ((mode_touch && $scope.active_tool=="pointer") || evt.which == 2 || evt.buttons == 4) {
        $scope.active_tool = "pan";
      }

      if ($scope.active_tool=="note") {
        this.deselect();
        this.mouse_state = "transform";
        $scope.mouse_state = this.mouse_state;
        this.start_drawing_note(evt);
        return;

      } else if ($scope.active_tool=="arrow") {
        this.deselect();
        this.mouse_state = "vector_transform";
        $scope.mouse_state = this.mouse_state;
        this.start_drawing_arrow(evt);
        return;

      } else if ($scope.active_tool=="line") {
        this.deselect();
        this.mouse_state = "vector_transform";
        $scope.mouse_state = this.mouse_state;
        this.start_drawing_line(evt);
        return;

      } else if ($scope.active_tool=="scribble") {
        this.deselect();
        this.mouse_state = "scribble";
        $scope.mouse_state = this.mouse_state;
        this.start_drawing_scribble(evt);
        return;

      } else if ($scope.active_tool=="zoom") {
        if (evt.altKey) {
          $scope.zoom_out();
        } else {
          $scope.zoom_in();
        }
        return;

      } else if ($scope.active_tool=="pointer") {
        this.mouse_state = "lasso";
        this.start_lasso(evt);
      } else if ($scope.active_tool=="zone") {
        this.deselect();
        this.mouse_state = "transform";
        $scope.start_adding_zone(evt);
        return;
      } else if ($scope.active_tool=="image") {
        this.deselect();
        this.mouse_state = "transform";
        $scope.start_adding_placeholder(evt);
        return;
      } else if ($scope.active_tool=="pan") {
        this.deselect();
        this.start_pan(evt);
        return;
      }

      if ($scope.selection_metrics.count>0) {
        this._no_artifact_toolbar_this_round = true;
      }

      this.deselect();
    },

    start_pan: function(evt) {
      var $scope = this.vm.$root;

      el = $("#space")[0];
      if (el) {
        this.mouse_state = "pan";
        this.old_panx = el.scrollLeft;
        this.old_pany = el.scrollTop;
      }

      var cursor = this.cursor_point_to_space(evt);
      $scope.mouse_ox = cursor.x;
      $scope.mouse_oy = cursor.y;
      $scope.mouse_moved = false;
    },

    deselect: function() {
      var $scope = this.vm.$root;

      $scope.deselect();
    },

    select: function(evt, a) {
      var $scope = this.vm.$root;

      $scope.select(evt, a);
    },

    multi_select: function(arts) {
      var $scope = this.vm.$root;

      $scope.multi_select(arts);
    },

    start_lasso: function(evt) {
      var point = this.cursor_point_to_space(evt);
      this.lasso = {
        x: point.x,
        y: point.y,
        w: 0,
        h: 0
      }
    },

    rects_intersecting: function(r1,r2) {
      if (!r1 || !r2) return false;

      if ( (r1.x+r1.w < r2.x)
        || (r1.x > r2.x+r2.w)
        || (r1.y+r1.h < r2.y)
        || (r1.y > r2.y+r2.h) ) return false;
      return true;
    },

    artifacts_in_rect: function(rect) {
      if (!rect) return [];

      var $scope = this.vm.$root;

      return _.filter($scope.active_space_artifacts, function(a) {
        return this.rects_intersecting(a, rect);
      }.bind(this));
    },

    abs_rect: function(rect) {
      var res = {
        x: rect.x,
        y: rect.y,
        w: Math.abs(rect.w),
        h: Math.abs(rect.h)
      }
      if (rect.w<0) res.x+=rect.w;
      if (rect.h<0) res.y+=rect.h;
      return res;
    },

    lasso_style: function() {
      var $scope = this.vm.$root;

      if (!this.lasso) return "";
      var lasso_scaled = {
        x:this.lasso.x,
        y:this.lasso.y,
        w:this.lasso.w,
        h:this.lasso.h
      }
      lasso_scaled = this.abs_rect(lasso_scaled);

      var s = "left:"  +lasso_scaled.x+"px;";
      s +=    "top:"   +lasso_scaled.y+"px;";
      s +=    "width:" +lasso_scaled.w+"px;";
      s +=    "height:"+lasso_scaled.h+"px;";
      s +=    "opacity: 1;";
      return s;
    },

    render_lasso: function() {
      if (!this.lasso) {
        $("#lasso").hide();
        return;
      }

      $("#lasso").attr("style", this.lasso_style());
      $("#lasso").show();
    },

    // Translate the mouse cursor location from device window coordinates to virtual space coordinates
    cursor_point_to_space: function(evt) {
      var $scope = this.vm.$root;

      evt = fixup_touches(evt);

      return {
        x: $scope.scroll_left + (parseInt(evt.pageX) - $scope.bounds_margin_horiz) / $scope.viewport_zoom,
        y: $scope.scroll_top  + (parseInt(evt.pageY) - $scope.bounds_margin_vert)  / $scope.viewport_zoom
      };
    },

    rect_to_points: function(rect) {
      return [
        {x:rect.x,y:rect.y},
        {x:rect.x+rect.w,y:rect.y},
        {x:rect.x,y:rect.y+rect.h},
        {x:rect.x+rect.w,y:rect.y+rect.h}
      ];
    },

    old_selection_rect: function() {
      var $scope = this.vm.$root;

      var selected = $scope.selected_artifacts().map(function(a){
        return $scope.find_artifact_before_transaction(a);
      }.bind(this));

      return $scope.enclosing_rect(selected);
    },

    snap_point: function(x,y,snap_middle) {
      var $scope = this.vm.$root;

      var TOL = 8;
      var dists = [];

      if (snap_middle) {
        dists.push([[x-window.innerWidth/2,Math.abs(y-window.innerHeight/2)],[x-window.innerWidth/2,Math.abs(y-window.innerHeight/2)]]);
      }

      if ($scope.grid_active) {
        // snap to grid
        var gw = $scope.grid.spacing/$scope.grid.subdivisions;
        var gh = $scope.grid.spacing/$scope.grid.subdivisions;

        var sx1 = parseInt(x/gw)*gw;
        var sy1 = parseInt(y/gh)*gh;
        var sx2 = (parseInt(x/gw)+1)*gw;
        var sy2 = (parseInt(y/gh)+1)*gh;

        dists = [[[Math.abs(sx1-x),sx1], [Math.abs(sy1-y),sy1]],
                 [[Math.abs(sx2-x),sx2], [Math.abs(sy2-y),sy2]]];

      } else {

        // snap to other artifacts

        dists = $scope.unselected_artifacts().map(function(a){

          var r  = this.rect_to_points(a);

          var xd1 = Math.abs(r[0].x-x);
          var xd2 = Math.abs(r[1].x-x);
          var xd3 = Math.abs(r[0].x+a.w/2 - x);

          var yd1 = Math.abs(r[0].y-y);
          var yd2 = Math.abs(r[2].y-y);
          var yd3 = Math.abs(r[0].y+a.h/2 - y);

          if (!snap_middle) {
            if (xd2<xd1) {
              var xd = xd2;
              var sx = r[1].x;
            } else {
              var xd = xd1;
              var sx = r[0].x;
            }

            if (yd2<yd1) {
              var yd = yd2;
              var sy = r[2].y;
            } else {
              var yd = yd1;
              var sy = r[0].y;
            }
          }

          if (snap_middle) {
            var xd = xd3;
            var sx = r[0].x+a.w/2;

            var yd = yd3;
            var sy = r[0].y+a.h/2;
          }

          return [[xd,sx],[yd,sy]];
        }.bind(this));
      }

      // snap to space edges

      dists.push([[Math.abs(x),0],[Math.abs(y),0]]);
      //dists.push([[Math.abs(dims.width-x),dims.width],[Math.abs(dims.height-y),dims.height]]);

      var unzipped = _.unzip(dists);
      var xdists = _.sortBy(unzipped[0], function(pair) {return pair[0];});
      var ydists = _.sortBy(unzipped[1], function(pair) {return pair[0];});

      var results = {snapx:xdists[0], snapy:ydists[0]};
      if (!xdists[0] || xdists[0][0]>TOL) {
        results.snapx = [0,x];  // distance, coordinate
      } else {
        // FIXME snap rulers are broken
        //$scope.snap_ruler_x = xdists[0][1];
      }
      if (!ydists[0] || ydists[0][0]>TOL) {
        results.snapy = [0,y];
      } else {
        //$scope.snap_ruler_y = ydists[0][1];
      }

      return results;
    },

    start_drawing_note: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var $scope = this.vm.$root;
      var point = this.cursor_point_to_space(evt);
      var z = $scope.highest_z()+1;

      var note_w = 250;
      var note_h = 250;

      var a = {
        space_id: $scope.active_space._id,
        mime: "text/html",
        description: "<p>Text</p>",
        x: point.x-note_w/2,
        y: point.y-note_h/2,
        z: z,
        w: note_w,
        h: note_h,
        align: "center",
        valign: "middle",
        stroke_color: $scope.active_style.stroke_color,
        text_color: $scope.active_style.text_color,
        fill_color: $scope.active_style.fill_color,
        stroke: 0,
        padding_left: 10,
        padding_right: 10,
        padding_top: 10,
        padding_bottom: 10
      };

      $scope.save_artifact(a, function(saved_a) {
        $scope.update_board_artifact_viewmodel(saved_a);
        $scope.active_space_artifacts.push(saved_a);
        $scope.select(evt,a);
        $scope.transform_ox = 0;
        $scope.transform_oy = 0;
        $scope.begin_transaction();
      }.bind(this));
    },

    start_drawing_scribble: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var $scope = this.vm.$root;
      var point = this.cursor_point_to_space(evt);
      var z = $scope.highest_z()+1;

      $scope.deselect();

      var a = {
        space_id: $scope.active_space._id,
        mime: "x-spacedeck/vector",
        description: "",
        control_points: [{dx:0,dy:0}],
        x: point.x,
        y: point.y,
        z: z,
        w: 64,
        h: 64,
        stroke_color: $scope.active_style.stroke_color == "rgba(0,0,0,0)" ? "rgba(0,0,0,255)" : $scope.active_style.stroke_color,
        stroke: $scope.active_style.stroke == 0 ? 2 : $scope.active_style.stroke,
        shape: "scribble"
      };

      $scope.save_artifact(a, function(saved_a) {
        $scope.update_board_artifact_viewmodel(saved_a);
        $scope.active_space_artifacts.push(saved_a);

        this.select(evt,saved_a);
        //$scope.tool_artifact = a;
        $scope.transform_ox = 0;
        $scope.transform_oy = 0;
        $scope.begin_transaction();
      }.bind(this));
    },

    start_drawing_arrow: function(evt) {

      evt.preventDefault();
      evt.stopPropagation();

      var $scope = this.vm.$root;
      var point = this.cursor_point_to_space(evt);
      var z = $scope.highest_z()+1;

      var a = {
        space_id: $scope.active_space._id,
        mime: "x-spacedeck/vector",
        description: "",
        control_points: [{dx:0,dy:0},{dx:0,dy:0},{dx:0,dy:0}],
        x: point.x,
        y: point.y,
        z: z,
        w: 64,
        h: 64,
        stroke_color: $scope.active_style.stroke_color == "rgba(0,0,0,0)" ? "rgba(0,0,0,255)" : $scope.active_style.stroke_color,
        stroke: $scope.active_style.stroke == 0 ? 2 : $scope.active_style.stroke,
        shape: "arrow"
      };

      $scope.save_artifact(a, function(saved_a) {
        $scope.update_board_artifact_viewmodel(saved_a);
        $scope.active_space_artifacts.push(saved_a);
        $scope.select(evt,a);
        $scope.selected_control_point_idx = 1;
        $scope.transform_ox = 0;
        $scope.transform_oy = 0;
        $scope.begin_transaction();
      }.bind(this));
    },

    // FIXME: consolidate with arrow drawing?
    start_drawing_line: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var $scope = this.vm.$root;
      var point = this.cursor_point_to_space(evt);
      var z = $scope.highest_z()+1;

      var a = {
        space_id: $scope.active_space._id,
        mime: "x-spacedeck/vector",
        description: "",
        control_points: [{dx:0,dy:0},{dx:0,dy:0}],
        x: point.x,
        y: point.y,
        z: z,
        w: 64,
        h: 64,
        stroke_color: "#000000",
        stroke: 2,
        shape: "line"
      };

      $scope.save_artifact(a, function(saved_a) {
        $scope.update_board_artifact_viewmodel(saved_a);
        $scope.active_space_artifacts.push(saved_a);
        $scope.select(evt,a);
        $scope.selected_control_point_idx = 1;
        $scope.transform_ox = 0;
        $scope.transform_oy = 0;
        $scope.begin_transaction();
      }.bind(this));
    },

    snap_point_simple: function(point) {
      var snapped = this.snap_point(point.x, point.y);
      return {
        x: snapped.snapx[1],
        y: snapped.snapy[1]
      }
    },

    handle_mouse_up_space: function(evt) {
      var $scope = this.vm.$root;

      evt.preventDefault();

      if (this.mouse_state == "lasso") {
        var lasso_rect = this.abs_rect(this.lasso);

        if (lasso_rect.w>0 && lasso_rect.h>0) {
          var arts = this.artifacts_in_rect(lasso_rect);
          this.multi_select(arts);
        } else {

          if (this._no_artifact_toolbar_this_round) {
            this._no_artifact_toolbar_this_round = false;
          } else {
            $scope.start_adding_artifact(evt);
          }
        }
        this.lasso = null;
        this.render_lasso();
      }
      else if (_.include(["transform","move","vector_transform","scribble"],this.mouse_state)) {
        var ars = $scope.selected_artifacts();

        for (var i=0; i<ars.length; i++) {

          if (_.include(["text","placeholder"],$scope.artifact_major_type(ars[i]))) {
            // some types of artifact need a minimum size
            if (ars[i].w<10) {
              ars[i].w = 10;
            }
            if (ars[i].h<10) {
              ars[i].h = 10;
            }
          }

          //save_artifact(ars[i], null, $scope.display_saving_error);
        }

        // update vector handles
        $scope.update_selection_metrics();
      }

      if (this.mouse_state == "text_editor") {
        return;
      }

      if (_.include(["zoom", "scribble", "pan"], $scope.active_tool)) {
        // tools that stay active after use
        this.mouse_state = "idle";
        $scope.mouse_state = this.mouse_state;
        $scope.end_transaction();
        $scope.deselect();
        return;
      }

      this.mouse_state = "idle";
      $scope.mouse_state = this.mouse_state;
      this.lasso = null;
      $scope.active_tool = "pointer";
      $scope.end_transaction();
      $scope.show_toolbar_props();

    },

    handle_mouse_leave: function(evt) {
      var $scope = this.vm.$root;

      this.mouse_state = "idle";
      this.lasso = null;
      $scope.active_tool = "pointer";
      $scope.end_transaction();

      this.render_lasso();
    },

    handle_mouse_move: function(evt) {
      var $scope = this.vm.$root;
      if (!$scope.active_space) return;

      if (!$scope.editing_artifact_id) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      $scope.handle_scroll();

      var cursor = this.cursor_point_to_space(evt); // takes the raw event data and finds the mouse location in virtual space
      var dx = cursor.x - $scope.mouse_ox;
      var dy = cursor.y - $scope.mouse_oy;
      var dt = (new Date()).getTime() - this.last_mouse_move_time;
      this.last_mouse_move_time = (new Date()).getTime();

      // send cursor
      if (dx>10 || dy>10 || dt>100) {
        var name = "anonymous";
        if ($scope.logged_in) {
          name = $scope.user.nickname || $scope.user.email;
        } else {
          name = $scope.guest_nickname || "anonymous";
        }

        var cursor_msg = {
          action: "cursor",
          x: cursor.x,
          y: cursor.y,
          name: name,
          id: $scope.user._id||name
        };

        $scope.websocket_send(cursor_msg);
      }

      // side effects ftw!
      $scope.snap_ruler_x = -1000;
      $scope.snap_ruler_y = -1000;

      $scope.mouse_moved = true;

      $scope.transform_lock = evt.shiftKey;

      if ($scope.transform_lock) {
        if (this.mouse_state == "transform") {
          // lock aspect is done in transform
        } else {
          // lock axis
          if (Math.abs(dy)>Math.abs(dx)) {
            dx = 0;
          } else {
            dy = 0;
          }
        }
      }

      if (this.mouse_state == "move") {
        $scope.hide_toolbar_props();

        var snap_dx = 0;
        var snap_dy = 0;

        var selected = $scope.selected_artifacts();
        var snap_edges = this.old_selection_rect();

        if (selected.length && selected[0]._id==$scope.editing_artifact_id) {
          // bail out of moving editable artifact
          return;
        }

        if (snap_edges) {
          var mx = snap_edges.x1 + (snap_edges.x2-snap_edges.x1)/2;
          var my = snap_edges.y1 + (snap_edges.y2-snap_edges.y1)/2;
          var snapped1 = this.snap_point(snap_edges.x1 + dx, snap_edges.y1 + dy, false);
          var snapped2 = this.snap_point(snap_edges.x2 + dx, snap_edges.y2 + dy, false);
          var snapped3 = this.snap_point(mx + dx, my + dy, true);

          if (snapped3.snapx[0]>0) {
            snap_dx = mx + dx - snapped3.snapx[1];
          } else if (snapped2.snapx[0]>0) {
            snap_dx = snap_edges.x2 + dx - snapped2.snapx[1];
          } else {
            snap_dx = snap_edges.x1 + dx - snapped1.snapx[1];
          }

          if (snapped3.snapy[0]>0) {
            snap_dy = my + dy - snapped3.snapy[1];
          } else if (snapped2.snapy[0]>0) {
            snap_dy = snap_edges.y2 + dy - snapped2.snapy[1];
          } else {
            snap_dy = snap_edges.y1 + dy - snapped1.snapy[1];
          }
        }

        $scope.update_selected_artifacts(function(a) {
          var old_a = $scope.find_artifact_before_transaction(a);

          if (old_a) {
            return {
              x: old_a.x + dx - snap_dx,
              y: old_a.y + dy - snap_dy
            };
          } else {
            // deleted?
            return {};
          }
        }.bind(this));

      } else if (this.mouse_state == "transform") {
        var selected = $scope.selected_artifacts();
        var edges = this.old_selection_rect();

        if (!edges) {
          this.mouse_state = "idle";
          return;
        }

        $scope.hide_toolbar_props();

        var ew = (edges.x2-edges.x1);
        var eh = (edges.y2-edges.y1);

        var origin_x = edges.x1 + ew * $scope.transform_ox;
        var origin_y = edges.y1 + eh * $scope.transform_oy;

        // "leading point"
        var lead_x = edges.x1 + ew * (1-$scope.transform_ox) - origin_x;
        var lead_y = edges.y1 + eh * (1-$scope.transform_oy) - origin_y;

        var lead_snapped = this.snap_point(origin_x + lead_x + dx, origin_y + lead_y + dy);
        var moved_x = (lead_snapped.snapx[1] - origin_x);
        var moved_y = (lead_snapped.snapy[1] - origin_y);

        var scale_x = lead_x ? (moved_x)/lead_x : 1;
        var scale_y = lead_y ? (moved_y)/lead_y : 1;
        if ($scope.transform_lock) scale_y = scale_x;

        $scope.update_selected_artifacts(function(a) {
          var old_a = $scope.find_artifact_before_transaction(a);

          var x1 = origin_x + ((old_a.x - origin_x) * scale_x);
          var y1 = origin_y + ((old_a.y - origin_y) * scale_y);
          var x2 = origin_x + (((old_a.x + old_a.w) - origin_x) * scale_x);
          var y2 = origin_y + (((old_a.y + old_a.h) - origin_y) * scale_y);

          if (x1>x2) { var t = x1; x1 = x2; x2 = t; }
          if (y1>y2) { var t = y1; y1 = y2; y2 = t; }

          return {
            x: x1,
            y: y1,
            w: x2 - x1,
            h: y2 - y1
          };
        }.bind(this));

      } else if (this.mouse_state == "lasso") {
        this.lasso.w = dx;
        this.lasso.h = dy;

        this.render_lasso();

      } else if (this.mouse_state == "vector_transform") {
        $scope.hide_toolbar_props();

        var _this = this;
        $scope.update_selected_artifacts(function(a) {
          var old_a = $scope.find_artifact_before_transaction(a);

          var control_points = _.cloneDeep(old_a.control_points);
          var cp = control_points[$scope.selected_control_point_idx];

          var snapped = _this.snap_point(old_a.x+cp.dx+dx, old_a.y+cp.dy+dy);
          dx = snapped.snapx[1]-(old_a.x+cp.dx);
          dy = snapped.snapy[1]-(old_a.y+cp.dy);

          cp.dx += dx;
          cp.dy += dy;

          // special case for arrow's 3rd point
          if (a.shape == "arrow" && $scope.selected_control_point_idx!=2) {
            control_points[2].dx = (control_points[0].dx+control_points[1].dx)/2;
            control_points[2].dy = (control_points[0].dy+control_points[1].dy)/2;
          }

          return _this.normalize_control_points(control_points, old_a);
        }, false, true); // override_locked: false, temporary: true

      } else if (this.mouse_state == "scribble") {
        $scope.update_selected_artifacts(function(a) {
          var old_a = a;

          var control_points = _.cloneDeep(old_a.control_points);
          var offset = {x:cursor.x,y:cursor.y};

          control_points.push({
            dx: offset.x-old_a.x,
            dy: offset.y-old_a.y
          });

          return this.normalize_control_points(simplify_scribble_points(control_points), old_a);
        }.bind(this));

        var arts = $scope.selected_artifacts();

        if (arts.length) {
          $scope.update_board_artifact_viewmodel(arts[0]);
        }
      }
      else if (this.mouse_state == "pan") {
        if (!$("#space").length) return;
        el = $("#space")[0];

        el.scrollLeft -= dx*$scope.viewport_zoom;
        el.scrollTop  -= dy*$scope.viewport_zoom;

        $scope.handle_scroll();
      }
    },

    normalize_control_points: function(control_points, artifact) {
      var x1 = _.min(control_points,"dx").dx;
      var y1 = _.min(control_points,"dy").dy;
      var x2 = _.max(control_points,"dx").dx;
      var y2 = _.max(control_points,"dy").dy;

      var shiftx = -x1;
      var shifty = -y1;

      var shifted_cps = control_points.map(function(cp) {
        return {
          dx: cp.dx + shiftx,
          dy: cp.dy + shifty
        };
      });

      var w = Math.abs(x2 - x1);
      var h = Math.abs(y2 - y1);

      var bshiftx = 0;
      var bshifty = 0;

      if (artifact.w < 0) bshiftx = -artifact.w;
      if (artifact.h < 0) bshifty = -artifact.h;

      return {
        x: artifact.x + bshiftx - shiftx,
        y: artifact.y + bshifty - shifty,
        w: w,
        h: h,
        z: artifact.z,
        control_points: shifted_cps
      };
    }

  });
}
