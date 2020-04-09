/*
  SpacedeckAccount
  This module contains functions dealing with the spacedeck account.
*/

SpacedeckAccount = {
  data: {
    account_confirmed_sent: false,
    account_tab: 'invoices',
    password_change_error: null,
    feedback_text: "",
  },
  methods: {
    show_account: function() {
      this.activate_dropdown('account');
    },

    account_save_user_digest: function(val) {
      this.user.prefs_email_digest = val;
      this.save_user(function() {  
      });
    },

    account_save_user_notifications: function(val) {
      this.user.prefs_email_notifications = val;
      this.save_user(function() {
      });
    },

    save_user_email: function() {
      this.save_user(function() {
      }.bind(this));
    },

    save_user_language: function(lang) {
      localStorage.lang = lang;
      this.user.prefs_language = lang;
      this.save_user(function() {
        window._spacedeck_location_change = true;
        location.href="/spaces";
      }.bind(this));
    },

    save_user: function(on_success) {
      if (this.user.email_changed) {
        this.user.confirmed_at = null;
      }
      window._spacedeck_location_change = true;

      save_user(this.user, function(user) {
        if (on_success) on_success();
        else location.href="/spaces";

      }.bind(this), function(xhr){
        console.error(xhr)
      });
    },

    save_user_password: function(oldPass, newPass, newPassConfirm) {
      this.password_change_error = null;

      if (!oldPass) {
        this.password_change_error = "Current password required";
        return;
      }

      if (!newPass || !newPassConfirm) {
        this.password_change_error = "New password/password confirmation required";
        return;
      }

      if (newPass!=newPassConfirm) {
        this.password_change_error = "New Passwords do not match";
        return;
      }

      if (newPass.length < 6) {
        this.password_change_error = "New Password to short";
        return;
      }

      save_user_password(this.user, oldPass, newPass, function() {
        alert("OK. Password Changed.");
        this.password_change_current = "";
        this.password_change_new = "";
        this.password_change_new_confirmation = "";
      }.bind(this), function(xhr) {
        if (xhr.status == 403) {
          this.password_change_error = "Old Password not correct";
        } else {
          this.password_change_error = "Something went wrong. Please try again later.";
        }
      }.bind(this));
    },

    confirm_again: function() {
      resent_confirm_mail(this.user, function(re) {
        this.account_confirmed_sent = true;

        alert(__("confirm_again"));

      }.bind(this), function(xhr){
        console.error(xhr);
        alert("Something went wrong, please try again.");
      });
    },

    confirm_account: function(token) {
      confirm_user(this.user, token, function(re) {
        smoke.alert(__("confirmed"), function() {
          this.redirect_to("/spaces");
        }.bind(this));
      }.bind(this), function(xhr) {
        console.error(xhr);
        alert(xhr.responseText);
        this.redirect_to("/spaces");
      }.bind(this));
    },
  }
}
