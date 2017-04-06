
var SpacedeckAvatars = {
  data: {
    uploading_avatar: false,
    uploading_folder_avatar: false,
    uploading_cover: false
  },

  methods: {
    save_avatar_image: function(input, object_type, object) {
      if (input.files.length > 0) {
        var f = input.files[0];

        var finished = function() {
          this.uploading_avatar = false;
          this.uploading_cover = false;
          this.uploading_folder_avatar = false;
        }.bind(this);

        if (!_.include(["image/jpeg","image/jpg","image/png","image/gif"], f.type)) {
          alert("Unsupported file type. Please upload JPEG, PNG or GIF.");
          finished();
          return;
        }

        if (f.size > 1024*1024*3) {
          alert("File must be smaller than 3 megabytes.");
          finished();
          return;
        }

        save_avatar_file(object_type, object, f, function(res) {
          finished();
          this.uploading_avatar = false;
          this.uploading_cover = false;

          var newUri = res.avatar_thumb_uri;
          object.avatar_thumb_uri = newUri + "?cachebuster=" + Math.random();
        }.bind(this), function(error) {
          alert("Upload failed: " + error);
          finished();
        });
      }
    },

    save_space_avatar_image: function(viewmodel) {
      this.uploading_avatar = true;
      var func = this.save_avatar_image.bind(this);
      func(viewmodel.$event.target, "space", this.active_space);
    },
    save_folder_avatar_image: function(viewmodel) {
      this.uploading_folder_avatar = true;
      var func = this.save_avatar_image.bind(this);
      func(viewmodel.$event.target, "space", this.active_folder);
    },
    save_user_avatar_image: function(viewmodel) {
      this.uploading_avatar = true;
      var func = this.save_avatar_image.bind(this);
      func(viewmodel.$event.target, "user", viewmodel.$root.user);
    },

    delete_user_avatar_image: function() {
      this.user.avatar_original_uri = "";
      this.user.avatar_thumb_uri = "";
      save_user(this.user,function(updated) {
      }.bind(this));
    },

    save_user_background_image: function(viewmodel) {
      var input = viewmodel.$event.target;

      this.uploading_cover = true;

      var f = input.files[0];
      save_user_background_file(this.user, f, function(res) {
        this.user.background_original_uri = res.background_original_uri;
        this.uploading_cover = false;
      }.bind(this));
    }
  }
}
