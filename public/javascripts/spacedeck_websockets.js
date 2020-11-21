
SpacedeckWebsockets = {
  data: {
    users_online: {}
  },
  methods: {
    handle_live_updates: function(msg) {
      if (msg.model == "Space" && msg.object) {
        if (msg.object.space_type == "space") {
          if (this.active_space) {
            if (this.active_space._id == msg.object._id) {
              this.active_space = _.merge(this.active_space, msg.object);
            }
          }
        }
      }

      if (msg.model == "Message") {
        if (msg.action == "create" && msg.object) {
          var new_message = msg.object;
          if(this.active_space && this.active_space._id == new_message.space._id) {
            this.active_space_messages.push(new_message);
            this.refresh_space_comments();
          } else console.log("message created in another space.");
        }
      }

      if (msg.model == "Artifact") {
        if (msg.action == "create" && msg.object) {
          var new_artifact = msg.object;
          if (this.active_space && this.active_space._id == new_artifact.space_id) {
            var o = new_artifact;

            if (o._id && !this.find_artifact_by_id(o._id)) {
              this.update_board_artifact_viewmodel(new_artifact);
              this.active_space_artifacts.push(new_artifact)
            } else {
              console.log("warning: got create on existing artifact.");
              msg.action = "update"; // hackety hack!
            }
          } else console.log("artifact created in another space.");
        }
        else if ((msg.action == "update" || msg.action == "update-self") && msg.object) {
          if (msg.action == "update-self") {
            console.log(msg.object);
          }

          if (this.active_space) {
            var o = msg.object;
            if (o && o._id) {
              var existing_artifact = this.find_artifact_by_id(o._id);
              if (!existing_artifact) {
                existing_artifact = o;
              } else {
                for (key in o) {
                  existing_artifact[key] = o[key];
                  this.update_board_artifact_viewmodel(existing_artifact);
                }
              }
            }
          }
        }
        else if (msg.action == "delete" && msg.object) {
          if (this.active_space) {
            var o = msg.object;
            if (o._id){
              var existing_artifact = this.find_artifact_by_id(o._id);
              if (existing_artifact) {
                var idx = this.active_space_artifacts.indexOf(existing_artifact);
                this.active_space_artifacts.splice(idx, 1);
              } else console.log("existing artifact to delete not found");
            } else console.error("object without _id");
          }
        }
      }
    },

    subscribe: function(space) {
      if (this.websocket && this.websocket.readyState==1) {
        this.websocket.send(JSON.stringify({action: "subscribe", space_id: space._id}));
      } else {
        console.error("socket not ready yet. (subscribe)");
      }
    },

    is_member_online: function(space, member) {
      if (!member.user) {
        return false;
      }

      if (!this.users_online[space._id]) {
        return false;
      }

      var isOnline = _.find(this.users_online[space._id], function(u) {
        return (u._id == member.user._id);
      });

      return isOnline;
    },

    auth_websocket: function(space){
      if (!this.websocket) {
        this.init_websocket();
      }

      if (this.websocket && this.websocket.readyState==1) {
        var token = "";
        if (this.user) token = this.user.token;
        var auth_params = {
          action: "auth",
          editor_auth: space_auth,
          editor_name: this.guest_nickname,
          auth_token: token,
          space_id: space._id
        };
        console.log("[websocket] auth space");
        this.websocket.send(JSON.stringify(auth_params));
      }
    },

    websocket_send: function(msg) {
      if (!this.websocket) return;
      if (this.websocket.readyState!=1) return;

      try {
        this.websocket.send(JSON.stringify(msg));
      } catch (e) {
        // catch NS problems
      }
    },

    init_websocket: function() {
      if (this.websocket) this.websocket = null;

      if (this.current_timeout) {
        clearTimeout(this.current_timeout);
        this.current_timeout = null;
      }

      try {
        this.websocket = new WebSocket(ENV.websocketsEndpoint + "/socket");
      } catch (e) {
        console.log("[websocket] cannot establish websocket connection: ",e);
        this.current_timeout = setTimeout(function() {
          console.log("[websocket] reconnecting", e);
          this.init_websocket();
        }.bind(this),5000);
      }

      if (!this.websocket) {
        console.log("[websocket] no websocket support?");
        return;
      }

      this.websocket.onopen = function(evt) {
        if (this.current_timeout) {
          clearTimeout(this.current_timeout);
          this.current_timeout = null;
        }

        if (this.active_space_loaded) {
          this.auth_websocket(this.active_space);
        }
        this.online = true;

      }.bind(this);

      this.websocket.onclose = function(evt) {
        if (!window._spacedeck_location_change) {
          this.online = false;
        }

        if (!this.current_timeout) {
          this.current_timeout = setTimeout(function() {
            console.log("[websocket] onclose: reconnecting", evt);
            this.init_websocket();
          }.bind(this),5000);
        }
      }.bind(this);

      this.websocket.onmessage = function(evt) {
        this.online = true;

        try {
          var msg = JSON.parse(evt.data);
        } catch (e) {
          console.log("[websocket] malformed message: ",evt.data);
          return;
        }

        if (msg.channel_id == channel_id && !msg.action.match("-self")) {
          return;
        }

        if (msg.action == "cursor") {
          this.handle_user_cursor_update(msg);
        }
        else if (msg.action == "viewport") {
          this.handle_presenter_viewport_update(msg);
        }
        else if (msg.action == "media") {
          this.handle_presenter_media_update(msg);
        }

        if (msg.action == "update" || msg.action == "update-self" || msg.action == "create" || msg.action == "delete") {
          this.handle_live_updates(msg);
        }

        if (msg.action == "init") {
          channel_id = msg.channel_id;
        }

        if (msg.action == "auth_valid") {
          if (this.active_space) {
            this.subscribe(this.active_space);

            if (this.unsaved_transactions()) {
              console.log("[websockets-saver] found unsaved transactions, triggering save.");
              this.process_artifact_save_queue();
            }
          }
        }

        if (msg.action == "subscription_valid") {
          console.log("subscription_valid");
        }

        if (msg.action == "status_update") {
          var spaceId = msg.space_id;
          var users = msg.users;

          // filter ourselves
          if (this.user && this.user._id) {
            users = _.filter(users, function(u) {
              return (u && (u._id != this.user._id));
            }.bind(this));
          }

          users = _.filter(users, function(u) {
            return (u && (u._id || u.nickname));
          });

          this.users_online[spaceId] = users;

          if (this.active_space) {
            if (this.active_space._id == spaceId) {
              this.active_space_users = users;
            }
          }
        }
      }.bind(this);

      this.websocket.onerror = function(evt) {
        console.log("websocket.onerror:", evt);
        if (!window._spacedeck_location_change) {
          this.online = false;
          this.was_offline = true;
        }

        if (!this.current_timeout) {
          this.current_timeout = setTimeout(function() {
            console.log("websocket.onerror: reconnecting", evt);
            this.init_websocket();
          }.bind(this),5000);
        }

      }.bind(this);
    }
  }
}
