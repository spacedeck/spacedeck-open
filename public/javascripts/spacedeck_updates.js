/*
  SpacedeckUpdates
  This module contains functions dealing with Updates / Notifications.
*/

SpacedeckUpdates = {

  user_notifications: [],
  updates_items: [],

  update_name_for_key: function(key) {

    var updates_mapping = {
      'space_like': "liked",
      'space_comment': "commented in",
      'space_follow': "is now following",
      'space_publish': "published a new version of"
    }

    var name =  updates_mapping[key];
    if(name) return name;
    return key;
  },

  load_updates: function() {

    load_notifications(this.user, function(notifications) { 
      this.user_notifications = notifications;
    });
  },

  activate_updates: function() {
    $location.path("/updates");
  }
}