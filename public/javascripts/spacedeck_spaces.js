/*
  SpacedeckSpaces
  This module contains functions dealing with Spaces UI.
*/

var SpacedeckSpaces = {

  data: {
    active_space: {advanced:{}},
    active_space_loaded: false,
    active_space_role: "viewer",
    active_space_version_dirty: true,
    active_space_messages: [],
    active_space_memberships: [],
    active_folder_history_items: [],
    active_space_users: [],
    active_space_artifacts: [],
    active_space_path: [],
    access_settings_space: null,
    access_settings_memberships: [],
    pending_pdf_files: [],

    meta_visible: false,
    meta_unseen: 0,

    present_mode: false,
    space_editing_title: false,
    create_space_title: "",
    folder_reverse: 1,
    embedded: false,
    remix_cta: "Create Reply",
    publish_cta: "Publish",
    remix_copying: true,
    remix_style: "",
    guest_signup_enabled: false,
    space_embed_html: "",
    share_base: location.origin,
    share_base_url: location.origin+"/spaces/",
    share_base_url_enc: encodeURIComponent(location.origin+"/spaces/"),
    social_bar: true,
    can_add_comment: false,

    space_info_section: "access",
    editors_section: "list",
    selected_member: null,
    invite_member_role: 'viewer',
    invite_email_error: null,
    invite_email: "",
    invite_message: "",
    active_join_link: "",
    join_link_role: "viewer",

    mouse_state: "idle",

    // folders
    active_folder: null,
    folder_sorting: "updated_at",
    
    folder_spaces_filter: null,
    active_path_length : 0,

    space_comment: "",
    folder_spaces_search: "",

    // map of artifact IDs to medium rich text editor objects
    medium_for_object: {},
  },

  methods: {
    search_spaces: function() {
      var query = this.folder_spaces_search;
      load_spaces_search(query, function(spaces) {
        this.active_profile_spaces = spaces;
      }.bind(this));
    },
    guest_logout: function() {
      if ("localStorage" in window && localStorage) {
        delete localStorage['guest_nickname'];
      }
      this.guest_nickname = "";
      location.reload();
    },
    ask_guestname: function(dft, cb) {
      smoke.prompt(__('what_is_your_name', "Spacedeck") , function(content) {
        if (!content || (content.length === 0)) {
          this.ask_guestname(dft, cb);
        } else {
          this.guest_nickname = content;

          if ("localStorage" in window && localStorage) {
            try {
              localStorage['guest_nickname'] = this.guest_nickname;
            } catch(e) {
              console.error(e);
            }
          }
          if (cb) cb();
        }
      }.bind(this), {value: dft || "Guest "+parseInt(10000*Math.random()), ok: __("ok"), cancel: __("cancel")});
    },
    
    load_space: function(space_id, on_success, on_error) {
      this.folder_spaces_filter="";
      this.folder_spaces_search="";

      if (space_auth) {
        set_space_auth(space_auth);
      } else {
        set_space_auth(get_query_param("spaceAuth"));
      }
      
      this.embedded = !!(get_query_param("embedded"));

      var userReady = function() {
        this.close_dropdown();

        this.active_space_loaded = false;
        this.viewport_zoom = 1;
        this.viewport_zoom_percent = 100;

        this.loading_space_id = space_id;
        this.present_mode = false;
        this.active_space_is_readonly = true;
        this.opened_dialog = "none";
        this.open_space_dialog = "none";

        this.selected_artifacts_dict = {};
        this.update_selection_metrics();

        this.can_add_comment = false;

        var is_home = false;
        if (this.user) {
          is_home = (space_id == this.user.home_folder_id);
        }

        document.title = "Loading… | Spacedeck";

        load_space(space_id, function(space, role) {
          document.title = space.name;

          this.active_space_role = role || "viewer"; // via req header from backend

          if (!is_home) {
            load_members(space, function(members) {
              this.active_space_memberships = members;
            }.bind(this));
          }

          console.log("[websocket] auth start");

          if (space.space_type == "folder") {
            this.active_space = {advanced:{}};
            document.title = "Spacedeck";

            load_spaces(space_id, is_home, function(spaces) {
              space.children = spaces;

              this.loading_space_id = null;
              this.active_profile_spaces = space.children;
              this.active_folder = space;
              this.access_settings_space = space;

              this.auth_websocket(this.active_folder);

              this.load_space_path(this.active_folder);

              if (is_home) {
                this.root_folder = space;
              }

              load_history(space, function(history) {
                console.log("loaded digest", history);
                this.active_folder_history_items = history;
                this.meta_unseen = 0;

                if ("localStorage" in window && localStorage) {
                  var last_seen = parseInt(localStorage[this.meta_last_seen_key()], 10);
                } else {
                  var last_seen = 0;
                }

                for (var i=0; i<history.length; i++) {
                  var item = history[i];
                  var t = new Date(item.last_action).getTime();
                  var my_own = false;
                  if (item.users.length==1 && item.users[0]=="you") {
                    my_own = true;
                  }
                  if (t>last_seen && !my_own) this.meta_unseen++;
                }
              }.bind(this));

              this.active_view = "folders";
            }.bind(this));

            if ("localStorage" in window) {
              var key = "folder_sorting_"+space_id;
              var key2 = "folder_reverse_"+space_id;
              if (localStorage[key] && localStorage[key2]) {
                this.folder_sorting = localStorage[key];
                this.folder_reverse = parseInt(localStorage[key2]);
                console.log("loaded folder sorting: ",this.folder_sorting,this.folder_reverse);
              }
            }

            // legacy fix
            if (this.folder_sorting == "opened_at") {
              this.folder_sorting = "name";
            }

          } else if (space.space_type == "space") {
            this.artifacts = [];

            this.loading_space_id = null;

            document.title = space.name;

            if (space_auth || this.logged_in) {
              this.can_add_comment = true;
            }

            this.setup_watches();

            load_artifacts(space._id, function(artifacts) {

              // FIXME: how to cleanly handle this error?
              if (!artifacts) {
                artifacts = [];
              }
              
              // FIXME: remove kludge
              for (var i=0; i<artifacts.length; i++) {
                this.update_board_artifact_viewmodel(artifacts[i]);
              }
              this.active_space_artifacts = artifacts;

              this.$set("active_space", space);
              this.active_space = space;

              this.auth_websocket(this.active_space);

              this.active_view = "space";
              this.fixup_space_size();

              if (space._id != this.active_space._id) {
                this.present_mode = true;
                this.active_space_is_readonly = true;
              } else {
                this.active_space_is_readonly = false;
              }

              this.discover_zones();

              window.setTimeout(function() {
                this.zoom_to_fit();
              }.bind(this),10);

              if (on_success) {
                on_success();
              }

              this.active_space_loaded = true;
              this.extract_properties_from_selection(); // populates zones etc
              
              load_comments(space._id, function(messages) {
                if (!messages) messages = [];
                
                this.active_space_messages = messages;
                this.refresh_space_comments();
              }.bind(this), function(xhr) { console.error(xhr); });

            }.bind(this));

            if (this.active_space_role == "editor" || this.active_space_role == "admin") {
              this.present_mode = false;
              this.active_space_is_readonly = false;
            }

            // FIXME
            this.active_join_link = "";
            this.join_link_role = "viewer";
          }
        }.bind(this), function(xhr) {

          if (on_error) {
            return on_error(xhr);
          }

          if (xhr.status == 403) {
            if (!this.logged_in) {
              this.redirect_to("/login?space_id="+space_id);
            } else {
              this.redirect_to("/");
            }
          } else {
            this.redirect_to("/not_found");
            console.error(xhr);
          }
        }.bind(this));

      }.bind(this);
      
      var default_guest = "";
      if (("localStorage" in window && localStorage) && localStorage['guest_nickname']) {
        this.guest_nickname = localStorage['guest_nickname'];
        default_guest = this.guest_nickname;
        userReady();
      }

      if (!this.user.nickname && space_auth) {
        this.guest_nickname = get_query_param("nickname") || this.guest_nickname;
        if (this.guest_nickname) {
          userReady();
        } else {
          this.ask_guestname(default_guest, function() {
            userReady();
          });
        }
      } else {
        this.guest_nickname = "";
        userReady();
      }
    },

    refresh_space_comments: function() {
      this.meta_unseen = 0;
      var messages = this.active_space_messages;
      var last_seen = 0;

      if ("localStorage" in window && localStorage) {
        last_seen = parseInt(localStorage[this.meta_last_seen_key()], 10);
      }

      for (var i=0; i<messages.length; i++) {
        var item = messages[i];
        var t = new Date(item.updated_at).getTime();
        var my_own = false;
        if (this.user && this.user._id!=item.user_id && !item.editor_name) {
          my_own = true;
        }
        if (t>last_seen && !my_own) this.meta_unseen++;
      }
    },

    go_to_next_space: function() {
      var space_ids = this.active_folder.children.map(function(s){return s._id});
      var idx = space_ids.indexOf(this.active_space._id);
      console.log("index: ",idx);

      var cur_idx = idx;
      var done = false;
      while (!done) {
        var next = this.active_folder.children[(idx+1)%space_ids.length];
        if (next.space_type == "folder") {
          done = false;
          idx++;
        } else {
          done = true;
        }
        if (cur_idx == idx) done = true; // wraparound
      }
      this.load_space(next._id);
    },

    go_to_previous_space: function() {
      var space_ids = this.active_folder.children.map(function(s){return s._id});
      var idx = space_ids.indexOf(this.active_space._id);
      console.log("index: ",idx);

      var cur_idx = idx;
      var done = false;
      while (!done) {
        var idx = (idx<1?space_ids.length:idx)-1;
        var prev = this.active_folder.children[idx];
        if (prev.space_type == "folder") {
          done = false;
          idx--;
        } else {
          done = true;
        }
        if (cur_idx == idx) done = true; // wraparound
      }
      this.load_space(prev._id);
    },


    filtered_folder_children: function(type){
      var type = type || "space";
      return _.filter(this.active_folder.children, function(s){
        return s.space_type == type;
      })
    },

    load_space_path: function(space) {
      if (!space) return [];

      load_space_path(space._id, function(path) {
        this.active_space_path = path;
      }.bind(this), function() { console.log("could not load folder path")});
    },

    is_active_space_role: function(rolename) {
      if(!this.active_space) return false;
      return this.active_space_role == rolename;
    },

    create_space: function(space_type) {
      if (!this.active_folder) return;

      this.close_modal();
      this.folder_spaces_filter="";

      if (!this.active_folder.children) {
        this.active_folder.children = [];
      }

      if (!space_type) space_type = "space";

      var s = {
        name: space_type == "space" ? __("untitled_space") : __("untitled_folder"),
        artifacts: [],
        space_type: space_type,
        parent_space_id: this.active_folder._id
      };

      if (this.create_space_title.length) {
        s.name = this.create_space_title;
      }

      save_space(s, function(saved_space) {
        this.active_folder.children.push(saved_space);
        if (space_type != "folder") {
          this.redirect_to("/"+saved_space.space_type+"s/"+saved_space._id, function(succ) {
          });
        } else {
          this.rename_folder(saved_space);
        }
      }.bind(this), function(xhr) { 
        alert("Error: Could not create Space ("+xhr.status+").");
      }.bind(this));

    },

    save_space: function(s) {
      save_space(s);
    },

    create_space_version: function() {

      if (!this.is_pro(this.user)) {
        // pro feature
        smoke.confirm(__("spacedeck_pro_ad_versions"), function(confirmed) {
          if (confirmed) this.show_upgrade_modal();
        }.bind(this));
        return;
      }

      this.version_saving = true;
      this.present_mode = false;

      var s = this.active_space.draft_space;
      console.log("create_space_version:", s);

      duplicate_space(s, null, function(new_version_space) {
        load_spaces(this.active_space._id, false, function(space) {
          this.version_saving = false;
          this.activate_space_version(space, space.draft_space);

          alert("Version saved.");
        }.bind(this));
      }.bind(this), function(xhr){
        console.error(xhr);
      }.bind(this));
    },

    finalize_folder_profile_edit: function() {
      save_space(this.active_folder, function(saved_space) {
        this.close_modal();
      }.bind(this));
    },

    finalize_space_profile_edit: function() {
      save_space(this.active_space, function(saved_space) {
        this.close_modal();
      }.bind(this));
    },

    delete_space: function(space) {
      smoke.confirm(__("tool_delete_space", space.name), function(confirmed) {
        if (!confirmed) return;
        var idx = this.active_folder.children.indexOf(space);

        delete_space(space, function() {
          if (space.parent_space_id){
            this.redirect_to("/folders/"+space.parent_space_id, function(succ) {});
          } else {
            this.redirect_to("/spaces", function(succ) {});
          }

          this.close_modal();

          this.active_folder.children.splice(idx,1);
        }.bind(this));
      }.bind(this), {ok: __("ok"), cancel: __("cancel")});
    },

    duplicate_space: function(space) {
      duplicate_space(space, null, function(new_space) {
        //alert("Space duplicated.");
        this.active_folder.children.push(new_space);
      }.bind(this), function(xhr){
        console.error(xhr);
      }.bind(this));
    },

    remove_avatar: function(space) {
      remove_avatar_file("space", space, function(s) {
        this.active_space = s;
      }.bind(this));
    },

    rename_space: function(space) {
      this.close_dropdown();
      if (space.space_type == "folder") return this.rename_folder(space);
      smoke.prompt(__("new_space_title"), function(title) {
        if (title && title.length) {
          space.name = title;
          save_space(space);
        }
      }.bind(this), {value: space.name, ok: __("ok"), cancel: __("cancel")});
    },

    rename_folder: function(folder) {
      this.close_dropdown();

      smoke.prompt(__("new_folder_title"), function(title) {
        if (title && title.length) {
          folder.name = title;
          save_space(folder);
        }
      }.bind(this), {value: folder.name, ok: __("ok"), cancel: __("cancel")});
    },

    edit_space_title: function() {
      this.close_dropdown();
      if (this.active_space_role=="editor" || this.active_space_role=="admin") {
        this.space_editing_title = true;
        $("#space-title").focus();
      }
    },

    save_space_title: function(name) {
      this.active_space.name = name;
      save_space(this.active_space, function() {
        this.space_editing_title = false;
      }.bind(this));
    },

    save_space_keydown: function($event) {
      if ($event) {
        if ($event.keyCode != 13) {
          this.space_editing_title = true;
          return;
        }

        $event.preventDefault();
        $event.stopPropagation();
        $event.target.blur();
      }

      save_space(this.active_space, function(updated_space) {
        this.active_space.edit_slug = updated_space.edit_slug;
        this.space_editing_title = false;
      }.bind(this));
    },

    save_space_description: function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      var val = $event.target.innerText;
      $event.target.blur();
      this.active_space.description = val;
      save_space(this.active_space);
    },

    save_space_domain: function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      var val = $event.target.innerText;
      $event.target.blur();
      this.active_space.domain = val;
      save_space(this.active_space);
    },

    download_space: function() {
      smoke.quiz(__("download_space"), function(e, test) {
        if (e == "PDF") {
          this.download_space_as_pdf(this.active_space);
        } else if (e == "ZIP") {
          this.download_space_as_zip(this.active_space);
        }
      }.bind(this), {
        button_1: "PDF",
        button_2: "ZIP",
        button_cancel:__("cancel")
      });

    },

    download_space_as_png: function(space) {
      window.open(ENV.apiEndpoint + "/api/spaces/" + space._id + "/png");
    },

    download_space_as_pdf: function(space) {
      this.close_dropdown();
      this.global_spinner = true;
      get_resource("/spaces/" + space._id + "/pdf", function(o) {
        this.global_spinner = false;
        window.open(o.url, "_blank");
      }.bind(this), function(xhr) {
        this.global_spinner = false;
        alert("PDF export problem (" + xhr.status + ").");
      }.bind(this));
    },

    download_space_as_zip: function(space) {
      this.global_spinner = true;

      get_resource("/spaces/" + space._id + "/zip", function(o) {
       
        this.global_spinner = false; 
        location.href = o.url;

      }.bind(this), function(xhr) {
        this.global_spinner = false;
        alert("ZIP export problem (" + xhr.status + ").");
      }.bind(this));
    },
    
    download_space_as_list: function(space) {
      this.global_spinner = true;
      location.href = "/api/spaces/" + space._id + "/list";
    },
    
    toggle_follow_mode: function() {
      this.deselect();
      this.follow_mode = !this.follow_mode;
    },
    
    toggle_present_mode: function() {
      this.deselect();
      this.present_mode = !this.present_mode;
      if (this.present_mode) {
        //this.go_to_first_zone();
        if (this.embedded) {
          document.documentElement.requestFullscreen();
        }
      } else {
        if (this.embedded) {
          document.exitFullscreen();
        }
      }
    },

    meta_last_seen_key: function() {
      var seen_key = "meta-seen-";
      if (this.active_view == 'space') {
        if (!this.active_space) return "invalid";
        seen_key += this.active_space._id;
      } else if (this.active_view == 'folders') {
        if (!this.active_folder) return "invalid";
        seen_key += this.active_folder._id;
      }
      return seen_key;
    },

    toggle_meta: function() {
      this.meta_visible = !this.meta_visible;
      if (this.meta_visible) {
        var seen_key = this.meta_last_seen_key();

        if ("localStorage" in window && localStorage) {
          localStorage[seen_key] = new Date().getTime();
          console.log("seen_key: ",seen_key,localStorage[seen_key]);
          this.meta_last_seen = localStorage[seen_key];
        }
        this.meta_unseen = 0;
      }
    },

    toggle_space_access_mode: function() {
      this.access_settings_space.access_mode = (this.access_settings_space.access_mode=="public")?"private":"public";
      save_space(this.access_settings_space);
    },

    save_space_access_mode: function(evt) {
      // FIXME really bad that i have to do this manually. why is the
      // value not already updated when v-on="change" is fired?!
      this.access_settings_space.access_mode = evt.currentTarget.value;
      save_space(this.access_settings_space);
    },

    save_space_editors_locking: function(evt) {
      // FIXME same issue as above
      this.access_settings_space.editors_locking = evt.currentTarget.checked;
      save_space(this.access_settings_space);
    },

    create_join_link: function() {
      create_join_link(this.active_space._id, this.join_link_role, function(result) {
        this.active_join_link = "https://"+location.host+"/invitations/"+result.code+"/accept";
      }.bind(this));
    },

    delete_join_link: function() {
      get_join_link(this.active_space._id, function(result) {
        if (result && result.length) {
          delete_join_link(result[result.length-1]._id, function() {
            this.active_join_link = "";
          }.bind(this));
        }
      }.bind(this));
    },

    invite_member: function(space, emails_text, txt, role) {
      this.invite_email_error = null;

      var emails = emails_text.split(",");
      var displayed_success = false;

      _.each(emails, function(email) {
        email = email.trim();

        if (!validateEmail(email)) {
          this.invite_email_error = "Please enter a valid address."
          return;
        }

        var m = {
          email_invited: email,
          personal_message: txt,
          role: role
        }

        create_membership(space, m, function(m) {
          this.access_settings_memberships.push(m);
          console.log("membership created:", m);
          this.editors_section="list";
          
          if (!displayed_success) {
            displayed_success = true;
            smoke.alert("Invitation(s) sent.");
            this.invite_email = "";
            this.invite_message = "";
          }
        }.bind(this), function(xhr){
          try {
            var res = JSON.parse(xhr.response);
            alert("Error: "+res.error);
          } catch (e) {
            console.error(e, xhr);
          }
        }.bind(this));
      }.bind(this));
    },

    update_member: function(space, m, role) {
      m.role = role;
      save_membership(space, m, function() {
      }.bind(this), function(xhr) {
        try {
          var res = JSON.parse(xhr.response);
          alert("Error: "+res.error);
        } catch (e) {
          console.error(e, xhr);
        }
      }.bind(this));
    },

    // revoke
    remove_member: function(space, m) {
      delete_membership(space, m, function() {
        this.access_settings_memberships.splice(this.access_settings_memberships.indexOf(m), 1);
      }.bind(this), function(xhr) {
        try {
          var res = JSON.parse(xhr.response);
          alert("Error: "+res.error);
        } catch (e) {
          console.error(e, xhr);
        }
      }.bind(this));
    },

    history_back: function() {
      window.history.back();
    },

    create_space_comment: function(comment) {
      if (!comment.length) return;

      var data = {
        space: this.active_space._id,
        message: comment,
        editor_name: this.guest_nickname,
        user: this.user
      };

      save_comment(this.active_space._id, data, function(comment) {
        console.log("comment saved: ",comment.created_at);
        this.active_space_messages.push(comment);
        this.space_comment = "";
      }.bind(this), function(xhr){
        console.error(xhr);
      }.bind(this));
    },

    remove_space_comment: function(comment) {
      delete_comment(this.active_space._id, comment._id, function() {
        console.log("comment id:",comment._id);
        this.active_space_messages = _.filter(this.active_space_messages, function(c){return c._id!=comment._id;});
      }.bind(this), function(xhr){
        console.error(xhr);
      }.bind(this));
    },
    
    set_folder_sorting: function(key,reverse) {
      this.folder_sorting = key;
      this.folder_reverse = reverse?-1:1;

      console.log(key, reverse);
      
      if ("localStorage" in window) {
        localStorage["folder_sorting_"+this.active_folder._id] = this.folder_sorting;
        localStorage["folder_reverse_"+this.active_folder._id] = this.folder_reverse;
      }
    },

    activate_space_info_section: function(id) {
      this.space_info_section = id;
      this.editors_section = "list";

      if (id == "versions") {
        // load space versions
        load_spaces(this.active_space._id, null, function(space_with_children) {
          this.active_space.children = space_with_children.children;
          console.log("loaded: ",space_with_children);
        }.bind(this));
      } else if (id == "info") {
        // load replies
      }
    },

    handle_folder_drop: function(evt, dest) {
      try {
        var source = JSON.parse(evt.dataTransfer.getData("application/json"));
      } catch (e) {
        return;
      }
      if (!source || !source._id || !source.parent_space_id || !dest._id) return;

      if (source._id==dest._id) return;

      if (dest.space_type!="folder") {
        alert("Spaces can only be moved into folders.");
        return;
      }

      source.parent_space_id = dest._id;
      save_space(source, function() {
        var idx = _.findIndex(this.active_folder.children, function(s) { return s._id == source._id;});
        if (idx>=0) {
          this.active_folder.children.splice(idx,1);
          console.log("spliced: ",idx);
        }
      }.bind(this));
    },

    activate_access: function() {
      this.activate_modal("access");
      //this.meta_visible = false;

      if (this.active_space._id) {
        this.access_settings_space = this.active_space;
      } else if (this.active_folder && this.active_folder._id) {
        this.access_settings_space = this.active_folder;
      } else {
        return;
      }
      
      this.access_settings_memberships = this.active_space_memberships;
    },
    close_access: function() {
      this.close_modal();
    },

    show_offline_help: function() {
      smoke.confirm(__('was_offline'), function(confirmed) {
        if (!confirmed) return;
        location.reload();
      });
    }
  }
}
