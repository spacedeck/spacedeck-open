
var SpacedeckModals = {
  data: {
    active_modal: null,
    active_account_section: "user",
    active_space_profile_section: null,

    account_sections: [
      {
        id: "user",
        title: "Profile",
        icon:  "icon-user",
      },
      {
        id: "language", 
        title: "Language",
        icon:  "icon-globe",
      },
      {
        id: "email-notifications", 
        title: "Notifications",
        icon:  "icon-bell",
      },
      {
        id: "reset-password", 
        title: "Password",
        icon:  "icon-lock-closed",
      },
      {
        id: "remove-account", 
        title: "Terminate",
        icon:  "icon-logout",
      }
    ],
    folder_profile_sections: [
      {
        id: "editors", 
        title: "Editors",
        icon:  "icon-user-group",
        count: 1
      },   
      {
        id: "visibility", 
        title: "Visibility",
        icon:  "icon-eye-open",
        count: 1
      }
    ],

    space_profile_sections: [
      {
        id: "comments", 
        title: "Comments",
        icon:  "icon-messages",
        count: 1
      },
      {
        id: "history", 
        title: "History",
        icon:  "icon-history",
        count: 1
      },
      {
        id: "editors", 
        title: "Editors",
        icon:  "icon-user-group",
        count: 1
      },
      {
        id: "visibility", 
        title: "Visibility",
        icon:  "icon-eye-open",
        count: 1
      }
    ]
  },

  methods: {
    activate_modal: function(id) {
      this.active_modal = id;

      if (id == "folder-settings") {
        this.access_settings_space = this.active_folder;
        this.access_settings_memberships = this.active_space_memberships;
        this.editors_section = "list";
      }
    },

    close_modal: function() {
      this.active_modal = null;
    },

    activate_account_section: function(section_id) {
      this.active_account_section = section_id;
    },

    activate_space_profile_section: function(section_id) {
      this.active_space_profile_section = section_id;
    }
  }
}
