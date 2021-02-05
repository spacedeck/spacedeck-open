const Umzug = require('umzug');
const config = require('config')

function sequel_log(a,b,c) {
  console.log(a);
}

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  config.get('storage_database'),
  config.get('storage_username'),
  config.get('storage_password'),
  {
    host: config.get('storage_host'),
    dialect: config.get('storage_dialect'),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: config.has('db_logs_disabled') ? false : sequel_log,
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false,
    // SQLite only
    storage: config.get('storage_local_db')
  }
);
// https://github.com/sequelize/sequelize/issues/8019#issuecomment-384316346
Sequelize.postgres.DECIMAL.parse = function (value) { return parseFloat(value); };

var User;
var Session;
var Space;
var Membership;
var Artifact;
var Message;
var Action;

module.exports = {
  User: sequelize.define('user', {
    _id: {type: Sequelize.STRING, primaryKey: true},
    email: Sequelize.STRING,
    password_hash: Sequelize.STRING,
    nickname: Sequelize.STRING,
    avatar_original_uri: Sequelize.STRING,
    avatar_thumb_uri: Sequelize.STRING,
    confirmation_token: Sequelize.STRING,
    password_reset_token: Sequelize.STRING,
    api_token: Sequelize.STRING,
    home_folder_id: Sequelize.STRING,
    prefs_language: Sequelize.STRING,
    prefs_email_notifications: Sequelize.STRING,
    prefs_email_digest: Sequelize.STRING,
    created_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    updated_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
  }),

  CreatorSafeInclude: function(db) {
    return {
      model: this.User,
      as: 'creator',
      attributes: ['_id','email','nickname',
                   'avatar_original_uri',
                   'avatar_thumb_uri',
                   'created_at','updated_at']
    };
  },

  Session: sequelize.define('session', {
    token: {type: Sequelize.STRING, primaryKey: true},
    user_id: Sequelize.STRING,
    expires: Sequelize.DATE,
    created_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    device: Sequelize.STRING,
    ip: Sequelize.STRING
  }),

  Space: sequelize.define('space', {
    _id: {type: Sequelize.STRING, primaryKey: true},
    name: {type: Sequelize.STRING, default: "New Space"},
    space_type: {type: Sequelize.STRING, defaultValue: "space"},
    creator_id: Sequelize.STRING,
    parent_space_id: Sequelize.STRING,

    access_mode: {type: Sequelize.STRING, default: "private"}, // "public" || "private"
    password: Sequelize.STRING,
    edit_hash: Sequelize.STRING,
    edit_slug: Sequelize.STRING,
    editors_locking: Sequelize.BOOLEAN,

    thumbnail_uri: Sequelize.STRING,

    width: Sequelize.INTEGER,
    height: Sequelize.INTEGER,
    background_color: Sequelize.STRING,
    background_uri: Sequelize.STRING,

    created_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    updated_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    thumbnail_url: Sequelize.STRING,
    thumbnail_updated_at: {type: Sequelize.DATE}
  }),

  Membership: sequelize.define('membership', {
    _id: {type: Sequelize.STRING, primaryKey: true},
    space_id: Sequelize.STRING,
    user_id: Sequelize.STRING,
    role: Sequelize.STRING,
    code: Sequelize.STRING,
    state: {type: Sequelize.STRING, defaultValue: "pending"}, // valid: "pending", "active"
    email_invited: Sequelize.STRING,
    created_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    updated_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
  }),

  Message: sequelize.define('message', {
    _id: {type: Sequelize.STRING, primaryKey: true},
    space_id: Sequelize.STRING,
    user_id: Sequelize.STRING,
    editor_name: Sequelize.STRING,
    message: Sequelize.TEXT,
    created_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    updated_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
  }),

  Artifact: sequelize.define('artifact', {
    _id: {type: Sequelize.STRING, primaryKey: true},
    space_id: Sequelize.STRING,
    user_id: Sequelize.STRING,

    mime: Sequelize.STRING,
    thumbnail_uri: Sequelize.STRING,
    last_update_user_id: Sequelize.STRING,
    editor_name: Sequelize.STRING,
    last_update_editor_name: Sequelize.STRING,
    description: Sequelize.TEXT,
    state: {type: Sequelize.STRING, default: "idle"},

    //linked_to: Sequelize.STRING,
    title: Sequelize.STRING,
    tags: Sequelize.TEXT,
    search_text: Sequelize.STRING,
    link_uri: Sequelize.STRING,
    play_from: Sequelize.DECIMAL,
    play_to: Sequelize.DECIMAL,

    x: {type: Sequelize.DECIMAL, default: 0.0},
    y: {type: Sequelize.DECIMAL, default: 0.0},
    z: {type: Sequelize.DECIMAL, default: 0.0},
    r: {type: Sequelize.DECIMAL, default: 0.0},
    w: {type: Sequelize.DECIMAL, default: 100},
    h: {type: Sequelize.DECIMAL, default: 100},

    //control_points: [{
    //  dx: Number, dy: Number
    //}],

    control_points: Sequelize.TEXT,

    group: Sequelize.STRING,
    locked: {type: Sequelize.BOOLEAN, default: false},

    payload_uri: Sequelize.STRING,
    payload_thumbnail_web_uri: Sequelize.STRING,
    payload_thumbnail_medium_uri: Sequelize.STRING,
    payload_thumbnail_big_uri: Sequelize.STRING,
    payload_size: Sequelize.INTEGER, // file size in bytes

    fill_color: {type: Sequelize.STRING, default: "transparent"},
    stroke_color: {type: Sequelize.STRING, default: "#000000"},
    text_color: Sequelize.STRING,
    stroke: {type: Sequelize.DECIMAL, default: 0.0},
    stroke_style: {type: Sequelize.STRING, default: "solid"},
    alpha: {type: Sequelize.DECIMAL, default: 1.0},
    order: {type: Sequelize.INTEGER, default: 0},
    crop_x: Sequelize.INTEGER,
    crop_y: Sequelize.INTEGER,
    crop_w: Sequelize.INTEGER,
    crop_h: Sequelize.INTEGER,
    shape: Sequelize.STRING,
    shape_svg: Sequelize.TEXT,
    padding_left: Sequelize.INTEGER,
    padding_right: Sequelize.INTEGER,
    padding_top: Sequelize.INTEGER,
    padding_bottom: Sequelize.INTEGER,
    margin_left: Sequelize.INTEGER,
    margin_right: Sequelize.INTEGER,
    margin_top: Sequelize.INTEGER,
    margin_bottom: Sequelize.INTEGER,
    border_radius: Sequelize.INTEGER,
    align: {type: Sequelize.STRING, default: "left"},
    valign: {type: Sequelize.STRING, default: "top"},

    brightness: Sequelize.DECIMAL,
    contrast: Sequelize.DECIMAL,
    saturation: Sequelize.DECIMAL,
    blur: Sequelize.DECIMAL,
    hue: Sequelize.DECIMAL,
    opacity: Sequelize.DECIMAL,

    payload_alternatives: Sequelize.TEXT,

    /*payload_alternatives: [{
      mime: String,
      payload_uri: String,
      payload_thumbnail_web_uri: String,
      payload_thumbnail_medium_uri:  String,
      payload_thumbnail_big_uri: String,
      payload_size: Number
    }],*/

    created_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    updated_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
  }),

  init: async function() {
    User = this.User;
    Session = this.Session;
    Space = this.Space;
    Artifact = this.Artifact;
    Message = this.Message;
    Membership = this.Membership;

    Space.belongsTo(User, {
      foreignKey: {
        name: 'creator_id'
      },
      as: 'creator'
    });

    Membership.belongsTo(User, {
      foreignKey: {
        name: 'user_id'
      },
      as: 'user'
    });

    Membership.belongsTo(Space, {
      foreignKey: {
        name: 'space_id'
      },
      as: 'space'
    });

    Artifact.belongsTo(User, {
      foreignKey: {
        name: 'user_id'
      },
      as: 'user'
    });

    Artifact.belongsTo(Space, {
      foreignKey: {
        name: 'space_id'
      },
      as: 'space'
    });

    Message.belongsTo(User, {
      foreignKey: {
        name: 'user_id'
      },
      as: 'user'
    });

    Message.belongsTo(Space, {
      foreignKey: {
        name: 'space_id'
      },
      as: 'space'
    });

    await sequelize.sync();

    var umzug = new Umzug({
        storage: 'sequelize',
        storageOptions: {
            sequelize: sequelize
        },
        migrations: {
            params: [
                sequelize.getQueryInterface(),
                Sequelize
            ],
            path: './models/migrations',
            pattern: /\.js$/
        }
    });

    umzug.up().then(function(migrations)  {
      console.log('Migration complete up!');
    });

  },

  getUserRoleInSpace: (originalSpace, user, cb) => {
    originalSpace.path = [];
    
    if (originalSpace._id == user.home_folder_id || (originalSpace.creator_id && originalSpace.creator_id == user._id)) {
      cb("admin");
    } else {
      var findMembershipsForSpace = function(space, allMemberships, prevRole) {
        Membership.findAll({ where: {
          "space_id": space._id
        }}).then(function(parentMemberships) {
          var currentMemberships = parentMemberships.concat(allMemberships);

          if (space.parent_space_id) {
            Space.findOne({ where: {
              "_id": space.parent_space_id
            }}).then(function(parentSpace) {
              findMembershipsForSpace(parentSpace, currentMemberships, prevRole);
            });
          } else {
            // reached the top
            var role = prevRole;
            space.memberships = currentMemberships;

            if (role == "none") {
              if (originalSpace.access_mode == "public") {
                role = "viewer";
              }
            }

            currentMemberships.forEach(function(m, i) {
              if (m.user_id && m.user_id == user._id) {
                role = m.role;
              }
            });

            cb(role);
          }
        });
      };
      findMembershipsForSpace(originalSpace, [], "none");
    }
  },

  spaceToObject: (space) => {
    // FIXME TODO
    return space;
  },

  findUserBySessionToken: (token, cb) => {
    Session.findOne({where: {token: token}})
      .then(session => {
        if (!session) cb(null, null)
        else User.findOne({where: {_id: session.user_id}})
          .then(user => {
            cb(null, user)
          })
      })
  },

  unpackArtifact: (a) => {
    if (a.tags && (typeof a.tags)=="string") {
      a.tags = JSON.parse(a.tags);
    }
    if (a.control_points && (typeof a.control_points)=="string") {
      a.control_points = JSON.parse(a.control_points);
    }
    if (a.payload_alternatives && (typeof a.payload_alternatives)=="string") {
      a.payload_alternatives = JSON.parse(a.payload_alternatives);
    }
    return a;
  },

  packArtifact: (a) => {
    if (a.tags && (typeof a.tags)!="string") {
      a.tags = JSON.stringify(a.tags);
    }
    if (a.control_points && (typeof a.control_points)!="string") {
      a.control_points = JSON.stringify(a.control_points);
    }
    if (a.payload_alternatives && (typeof a.payload_alternatives)!="string") {
      a.payload_alternatives = JSON.stringify(a.payload_alternatives);
    }
    return a;
  }
}
