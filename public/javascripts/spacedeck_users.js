/*
  SpacedeckUsers
  This module contains functions dealing with Users and Authentication.
*/

SpacedeckUsers = {
  data: {
    user_forms_email: "",
    user_forms_name: "",
    invitation_token: null,
    login_email: "",
    login_password: "",
    signup_password: "",
    signup_invite_code: "",
    signup_password_confirmation: "",
    account_remove_error: null,
    loading_user: false,
    password_reset_confirm_error: "",
    password_reset_error: "",
  },
  methods:{
    load_user: function(on_success, on_error) {
      this.loading_user = true;

      load_current_user(function(user) {
        this.user = user;
        this.loading_user = false;
        this.logged_in = true;

        if (on_success) {
          on_success(user);
        }
      }.bind(this), function() {
        // error
        this.loading_user = false;
        this.logout();

        if (on_error) {
          on_error();
        }
      }.bind(this));
    },

    finalize_login: function(session_token, on_success) {
      this.load_user(function(user) {
        if (this.invitation_token) {
          accept_invitation(this.invitation_token, function(memberships){
            this.redirect_to("/spaces/"+memberships.space_id);
          }.bind(this), function(xhr){
            console.error(xhr);
            alert("Could not accept invitation. Maybe it was already accepted?");
            this.redirect_to("/spaces");
          }.bind(this));
        } else {
          if (on_success) {
            on_success(this.user);
          } else {
            if (get_query_param("space_id") && get_query_param("space_id").length==24) {
              this.redirect_to("/spaces/"+get_query_param("space_id"));
            } else {
              this.redirect_to("/spaces", function() {});
            }
          }
        }
      }.bind(this));
    },

    login_with_token: function(token) {
      create_session_for_oauthtoken(token, function(session) {
        this.session = session;
        this.finalize_login(session.token);
      }.bind(this), function(xhr){
        // FIXME: handle error
      }.bind(this));
    },

    login_submit: function(email, password, $event, on_success) {
      this.loading_user = true;
      this.login_error = null;

      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      create_session(email, password, function(session) {
        console.log("session: ", session);
        this.loading_user = false;
        this.session = session;
        this.finalize_login(session.token, on_success);

      }.bind(this), function(req) {
        this.loading_user = false;
        var msg = "";

        if (req.status>=403) {
          var msg = "error_unknown_email";
        } else {
          try {
            var msg = "error_"+(JSON.parse(req.responseText).error);
          } catch (e) {
            var msg = (req.responseText||"Unknown Error.").replace(/,/g," ");
          }
        }
        this.login_error = __(msg);

      }.bind(this));
    },

    login_submit_modal: function(email, password) {
      this.login_submit(email, password, null, function() {
        location.reload();
      });
    },

    signup_guest: function(on_success) {
    },

    signup_submit: function($event, name, email, password, password_confirmation, invite_code, on_success) {
      this.creating_user = true;
      this.signup_error = null;

      if (("localStorage" in window) && localStorage) {
        localStorage["sd_api_token"] = null;
      }
      api_token = null;

      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      create_user(name, email, password, password_confirmation, invite_code, function(session) {
        this.creating_user = false;
        this.login_submit(email, password, null, on_success);
      }.bind(this), function(req) {
        this.creating_user = false;
        try {
          var msg = "error_"+(JSON.parse(req.responseText).error);
        } catch (e) {
          var msg = (req.responseText||"Unknown Error.").replace(/,/g," ");
        }

        var msg = __(msg);
        this.signup_error = msg;
      }.bind(this));
    },

    signup_submit_modal: function($event, name, email, password, password_confirmation, invite_code) {
      this.signup_submit($event, name, email, password, password_confirmation, invite_code, function() {
        alert("Success.");
        location.reload();
      });
    },

    password_reset_submit: function(evt, email) {
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      this.password_reset_error = null;
      this.password_reset_send = false;

      if (email === undefined || email.length < 3) {
        this.password_reset_error = "This is not a valid email address";
        return;
      }

      create_password_reset(email, function(parsed,req) {
        if(req.status==201) {
          this.password_reset_send = true;
        }
      }.bind(this), function(req) {
        console.log(req.status);
        if (req.status==404) {
          var msg = "error_unknown_email";
        } else {
          try {
            var msg = "error_"+(JSON.parse(req.responseText).error);
          } catch (e) {
            var msg = (req.responseText||"Unknown Error.").replace(/,/g," ");
          }
        }
        this.password_reset_error = __(msg);
      }.bind(this));
    },

    password_reset_confirm: function(evt, password, password_confirmation) {
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      this.password_reset_confirm_error = null;
      this.password_reset_send = false;

      if (password != password_confirmation) {
        this.password_reset_confirm_error = "Passwords do not match.";
        return;
      }

      if (password.length < 5) {
        this.password_reset_confirm_error = "Password too short (must have at least 5 characters).";
        return;
      }

      confirm_password_reset(password, this.reset_token, function(parsed,req) {
        if (req.status==201) {
          alert("New password set successfully.");
          this.active_view = "login";
        } else {
          alert("An unknown error occured.");
        }
      }.bind(this), function(req) {
        if (req.status==404) {
          alert("Error: Unknown user.");
        } else {
          alert("Error: "+req.statusText);
        }
      }.bind(this));
    },

    logout: function() {
      this.active_view="login";
      this.logged_in = false;
      delete_session(function() {

        this.active_space = {advanced:{}};
        this.active_space_loaded = false;
        this.active_sidebar_item = "none";
        this.sidebar_state = "closed";
        this.loading_user = false;
        api_token = null;
        this.user = {};
        this.active_content_type = "login";
        this.redirect_to("/");

      }.bind(this));
    },

    send_feedback: function(text) {
      if (text.length>0) {
        create_feedback(this.user, text, function(xhr) {
          alert(__("feedback_sent"));
          this.close_modal()
        }.bind(this), function(xhr) {
          console.error(xhr);
        });
      }
    },

    remove_account: function(password, reason) {
      this.account_remove_error = null;

      if (reason && reason.length && (reason.length > 1)) {
        create_feedback(this.user, reason, function(xhr) {
          console.log("feedback sent");
        }, function(xhr){});
      }

      if (!password) {
        this.account_remove_error = "Password not correct";
        return;
      }

      delete_user(this.user, password, function(xhr) {
        alert("Sorry to see you go. Goodbye!");
        this.logout();
      }.bind(this), function(xhr) {
        this.account_remove_error = "Password not correct ("+xhr.status+")";
      }.bind(this));
    },

    user_avatar_image: function(user) {
      return user.avatar_thumb_uri;
    },

    user_initials: function(user) {
      var parts = (user?(user.nickname||user.email):"anonymous").replace(/[^a-zA-Z]/g,' ').replace(/ +/g,' ').split(' ');
      if (parts.length>1) {
        return parts[0][0]+parts[1][0];
      }
      return parts[0].substring(0,2);
    },

    has_avatar_image: function(user) {
      return !!(user && user.avatar_thumb_uri && user.avatar_thumb_uri.length>0);
    },

    is_pro: function(user) {
      return true;
    },
  }
}
