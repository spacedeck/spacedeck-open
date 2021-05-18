
function boot_spacedeck() {
  console.log("booting...");
  // custom directives

  setup_directives();
  setup_whiteboard_directives();
  setup_exclusive_audio_video_playback();

  var data = {
    active_view: null,
    online: true,
    was_offline: false,
    account: "profile",
    logged_in: false,
    guest_nickname: null,
    embedded: false,
    user: {},

    active_profile: null,
    active_profile_spaces: [],
    active_dropdown: "none",

    creating_user: false,
    signup_error: null,
    login_error: null,
    password_reset_send: false,
    password_reset_error: null,
    password_reset_email: null,
    password_reset_confirm_error: null,
    reset_token: null,

    global_spinner: false
  };

  var methods = {
    activate_dropdown: function(id, evt) {
      if (this.active_dropdown == id) {
        this.active_dropdown = "none";
        return;
      }
      this.active_dropdown = id;
    },

    close_dropdown: function(evt) {
      if (evt) {
        if ($(evt.target).parents(".dropdown").length) {
          return;
        }
      }

      this.active_dropdown = "none";
    },

    translate: function() {
      return i18n.t(arguments)
    },
  };

  // mix in functions from all Spacedeck modules

  methods = _.extend(methods, SpacedeckUsers.methods);
  methods = _.extend(methods, SpacedeckWebsockets.methods);
  methods = _.extend(methods, SpacedeckSpaces.methods);
  methods = _.extend(methods, SpacedeckTeams.methods);
  methods = _.extend(methods, SpacedeckBoardArtifacts);
  methods = _.extend(methods, SpacedeckFormatting);
  methods = _.extend(methods, SpacedeckSections.methods);
  methods = _.extend(methods, SpacedeckAvatars.methods);
  methods = _.extend(methods, SpacedeckModals.methods);
  methods = _.extend(methods, SpacedeckAccount.methods);
  methods = _.extend(methods, SpacedeckRoutes);

  data = _.extend(data, SpacedeckUsers.data);
  data = _.extend(data, SpacedeckAccount.data);
  data = _.extend(data, SpacedeckWebsockets.data);
  data = _.extend(data, SpacedeckSpaces.data);
  data = _.extend(data, SpacedeckTeams.data);
  data = _.extend(data, SpacedeckSections.data);
  data = _.extend(data, SpacedeckAvatars.data);
  data = _.extend(data, SpacedeckModals.data);

  Vue.filter('select', function (array, key, operant, value) {
      var res = _.filter(array, function(e){
      var test = eval(e[key] + " " + operant + " " + value);
      return test;
    });
    return res;
  });

  Vue.filter('date', function (value, format) {
    var day = moment(value);
    return day.format(format).replace("\'", "").replace("\'", "");
  });

  Vue.filter('exceptFilter', function (array, key) {
    var filtered = _.filter(array, function(i){
      return i[key]==undefined;
    });
    return filtered;
  });

  Vue.filter('size', function (array) {
    return array.length;
  });

  Vue.filter('empty?', function (array) {
    return array.length==0;
  });

  Vue.filter('urls_to_links', function (text) {
    return urls_to_links(text);
  });

  window.spacedeck = new Vue({
    el: "body",
    data: data,
    methods: methods
  });

  var lang = "en";

  window.refreshLocale = function() {
    var old_lang = lang;
    if (spacedeck && spacedeck.user && spacedeck.user.prefs_language) {
      lang = spacedeck.user.prefs_language || "en";
    } else if (window.browser_lang) {
      lang = window.browser_lang;
    }
    if (lang != old_lang) {
      i18n.init({ lng: lang, resStore: window.locales }, function(err, t) {
        console.log("i18n initialized: "+lang);
      });
    }
  }

  window.refreshLocale();

  i18n.init({ lng: lang, resStore: window.locales }, function(err, t) {
    console.log("i18n initialized: "+lang);
  });

  window.__ = function() {
    var params = Array.prototype.slice.call(arguments);
    params.shift();
    window.refreshLocale();
    return i18n.t(arguments[0], { postProcess: "sprintf", sprintf: params });
  };

  spacedeck.setup_section_module();
  spacedeck.load_user(function() {
    spacedeck.route();
  },function() {
    spacedeck.route();
  });

  window.addEventListener("paste", function(evt) {
    if (evt.target.nodeName=="INPUT" || (evt.target.nodeName=="TEXTAREA" && evt.target.id!="clipboard-ta") || evt.target.contenteditable) {
      // cancel
      return;
    }
    if (spacedeck.active_space) {
      spacedeck.handle_section_paste(evt);
    }
  });
}

document.addEventListener("DOMContentLoaded",function() {
  window.smoke = smoke;
  window.alert = smoke.alert;
  
  FastClick.attach(document.body);
  boot_spacedeck();
});
