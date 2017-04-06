/*
  SpacedeckTeams
  This module contains functions dealing with Teams.
*/

var SpacedeckTeams = {

  data: {
    team_members: [],
    team_loading: false,
    team_logo: "",
    team_emails: "",
    team_email_invited: false,
    team_plan_calculation: "",
  },

  methods: {
    is_admin: function(user) {
      return _.filter(user.team.admins, function(admin_id) {
        return admin_id == user._id;
      }).length > 0;
    },

    calculate_team: function() {
      this.team_plan_calculation = "";
    },

    load_team: function() {
      if (this.user.team) {
        load_resource("GET", "/teams/" + this.user.team._id + "/memberships", null, function(members) {
          this.team_members = members;

          this.calculate_team();
        }.bind(this), function(xhr, textStatus, errorThrown) {
          console.log(xhr, textStatus, errorThrown);
        });
      }
    },

    team_save: function() {
      load_resource("PUT", "/teams/" + this.user.team._id , this.user.team, function(res, xhr) {
        alert("Team updated.");
      }.bind(this), function(xhr) {
        console.error(xhr);
        alert("Could not update Team.");
      });
    },

    team_update_member: function(m){
      load_resource("PUT", "/teams/" + this.user.team._id + "/memberships/" + m._id, m, function(res, xhr) {
        console.log("members updated");
      }.bind(this), function(xhr) {
        console.error(xhr);
      });
    },

    team_invite_members: function(emails) {
      var emailList = emails.split(",");
      for (_i = 0, _len = emailList.length; _i < _len; _i++) {
        email = emailList[_i];
        email = email.replace(new RegExp(" ", "g"), "").toLowerCase();

        if (validateEmail(email)) {
          var data = {
            email: email
          };

          load_resource("POST", "/teams/" + this.user.team._id + "/memberships", data, function(res, xhr) {
            
            this.team_email_invited = true;
            this.team_members.push(res);
            var timeoutID = window.setTimeout(function(){
              this.team_email_invited = false;
            }.bind(this), 1000);
      
            this.team_emails = "";

          }.bind(this), function(xhr, textStatus, errorThrown) {
            console.log(xhr, textStatus, errorThrown);
            this.team_invite_error = JSON.parse(xhr.responseText).error;

          }.bind(this));
        }

      }
    },
    team_promote_member: function(m) {
      load_resource("GET", "/teams/" + this.user.team._id + "/memberships/" + m._id + "/promote" , null, function(res, xhr) {
        this.load_user(function() {
          this.load_team();          
        }.bind(this));
      }.bind(this), function(xhr) {
        console.error(xhr);
      });
    },
    team_demote_member: function(m) {
      load_resource("GET", "/teams/" + this.user.team._id + "/memberships/" + m._id + "/demote" , null, function(res, xhr) {
        this.load_user(function() {
          this.load_team();          
        }.bind(this));
      }.bind(this), function(xhr) {
        console.error(xhr);
      });    
    },
    team_remove_member: function(m) {
      if (confirm("Really delete this member?")) {
        if (m.user_id && m.state === "active") {

          load_resource("DELETE", "/users/" + m._id, null, function(res, xhr) {
            var idx = this.team_members.indexOf(m);
            this.team_members.splice(idx, 1);
          }.bind(this), function(xhr) {
            console.error(xhr);
          });

        } else {
          load_resource("DELETE", "/teams/" + this.user.team._id + "/memberships/" + m._id, null, function(res, xhr) {
            var idx = this.team_members.indexOf(m);
            this.team_members.splice(idx, 1);
          }.bind(this), function(xhr) {
            console.error(xhr);
          });
        }
      }
    }
  }
}
