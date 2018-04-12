'use strict';

const db = require('../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const config = require('config');

const WebSocketServer = require('ws').Server;

//const RedisConnection = require('ioredis');
const async = require('async');
const _ = require("underscore");
const crypto = require('crypto');

const redisMock = require("./redis.js");

module.exports = {
  startWebsockets: function(server) {
    this.setupSubscription();
    
    if (!this.current_websockets) {
      if (config.get("redis_mock")) {
        this.state = redisMock.getConnection();
      } else {
        this.state = new RedisConnection(6379, process.env.REDIS_PORT_6379_TCP_ADDR || config.get("redis_host"));
      }
      this.current_websockets = [];
    }

    const wss = new WebSocketServer({ server:server,  path: "/socket" });
    wss.on('connection', function(ws) {

      this.state.incr("socket_id", function(err, socketCounter) {
        const socketId = "socket_"  + socketCounter + "_" + crypto.randomBytes(64).toString('hex').substring(0,8);
        const serverScope = this;

        ws.on('message', function(msgString){
          const socket = this;

          const msg = JSON.parse(msgString);

          if(msg.action == "auth"){

            const token = msg.auth_token;
            const editorName = msg.editor_name;
            const editorAuth = msg.editor_auth;
            const spaceId = msg.space_id;

            db.Space.findOne({where: {"_id": spaceId}}).then(space => {
              if (space) {
                const upgradeSocket = function() {
                  if (token) {
                    db.findUserBySessionToken(token, function(err, user) {
                      if (err) {
                        console.error(err, user);
                      } else {
                        if (user) {
                          serverScope.addUserInSpace(user._id, space, ws, function(err){
                            serverScope.addLocalUser(user._id, ws);
                            console.log("[websockets] user " + user.email + " online in space " +  space._id);
                          });
                        }
                      }
                    });
                  } else {
                    const anonymousUserId = space._id + "-" + editorName;

                    if(space.access_mode == "private" && space.edit_hash != editorAuth){
                      console.error("closing websocket: unauthed.");
                      ws.send(JSON.stringify({error: "auth_failed"}));
                      // ws.close();
                      return;
                    }

                    serverScope.addUserInSpace(anonymousUserId, space, ws, function(err){
                      serverScope.addLocalUser(anonymousUserId, ws);
                      console.log("[websockets] anonymous user " + anonymousUserId + " online in space " +  space._id);
                    });
                  }
                };

                if (!ws.id) {
                  ws['id'] = socketId;
                  try {
                    ws.send(JSON.stringify({"action": "init", "channel_id": socketId}));
                  } catch (e) {
                    console.log("ws.send error: "+e);
                  }
                }

                if (ws.space_id) {
                  serverScope.removeUserInSpace(ws.space_id, ws, function(err) {
                    upgradeSocket();
                  });
                } else {
                  upgradeSocket();
                }
              } else {
                ws.send(JSON.stringify({error: "space not found"}));
                ws.close();
                return;
              }
            });

          } else if (msg.action == "cursor" || msg.action == "viewport" || msg.action=="media") {
            msg.space_id = socket.space_id;
            msg.from_socket_id = socket.id;
            serverScope.state.publish('cursors', JSON.stringify(msg));
          }
        });

        ws.on('close', function(evt) {
          console.log("websocket closed: ", ws.id, ws.space_id);
          const spaceId = ws.space_id;
          serverScope.removeUserInSpace(spaceId, ws, function(err) {
            this.removeLocalUser(ws, function(err) {
            }.bind(this));
          }.bind(this));
        }.bind(this));

        ws.on('error', function(ws, err) {
          console.error(err, res);
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },

  setupSubscription: function() {
    if (config.get("redis_mock")) {
      this.cursorSubscriber = redisMock.getConnection().subscribe(['cursors', 'users', 'updates'], function (err, count) {
        console.log("[redis-mock] websockets subscribed to " + count + " topics." );
      });
    } else {
      this.cursorSubscriber = new RedisConnection(6379, process.env.REDIS_PORT_6379_TCP_ADDR || config.get("redis_host"));
      this.cursorSubscriber.subscribe(['cursors', 'users', 'updates'], function (err, count) {
        console.log("[redis] websockets subscribed to " + count + " topics." );
      });
    }
    
    this.cursorSubscriber.on('message', function (channel, rawMessage) {
      const msg = JSON.parse(rawMessage);
      const spaceId = msg.space_id;

      const websockets = this.current_websockets;

      if(channel === "updates") {
        for(let i=0;i<websockets.length;i++) {
          const ws = websockets[i];
          if(ws.readyState === 1) {
            ws.send(JSON.stringify(msg));
          }
        }
      } else if(channel === "users") {
        const usersList = msg.users;

        if (usersList) {
          for(let i=0;i<usersList.length;i++) {
            const activeUser = usersList[i];
            let user_id;

            if (activeUser._id) {
              user_id = activeUser._id;
            } else {
              user_id = spaceId + "-" + (activeUser.nickname||"anonymous");
            }

            for (let a=0; a < websockets.length; a++) {
              const ws = websockets[a];
              if(ws.readyState === 1){
                if(ws.space_id == spaceId) {
                  ws.send(JSON.stringify({"action": "status_update", space_id: spaceId, users: usersList}));
                } else {
                  //console.log("space id not matching", spaceId, ws.space_id);
                }

              } else {
                // FIXME SHOULD CLEANUP SOCKET HERE
                console.error("socket in wrong state", ws.readyState);
                if(ws.readyState == 3) {
                  this.removeLocalUser(ws, (err) => {
                    console.log("old websocket removed");
                  });
                }
              }
            }
          }
        } else {
          console.error("userlist undefined for websocket");
        }
      } else if(channel === "cursors") {
        const socketId = msg.from_socket_id;
        for (let i=0;i<websockets.length;i++) {
          const ws = websockets[i];
          if (ws.readyState === 1) {
            if (ws.space_id && spaceId) {
              if ((ws.space_id == spaceId) && (ws.id !== socketId)) {
                ws.send(JSON.stringify(msg));
              }
            } else {
              console.log("space id not set, ignoring");
            }
          }
        }
      }
    }.bind(this));
  },

  addLocalUser: function(username, ws) {
    if (ws.added) {
      return;
    }
    ws.added = true;
    this.current_websockets.push(ws);
  },
  
  removeLocalUser: function(ws, cb) {
    const idx = this.current_websockets.indexOf(ws);
    if(idx > -1) {
      this.removed_items = this.current_websockets.splice(idx, 1);
      console.log("removed local socket, current online on this process: ", this.current_websockets.length);
    } else {
      console.log("websocket not found to remove");
    }

    this.state.del(ws.id+"", function(err, res) {
      if (err) console.error(err, res);
      else {
        this.removeUserInSpace(ws.space_id, ws, (err) => {
          console.log("removed user from space list");
          this.distributeUsers(ws.space_id);
        })
        if(cb)
          cb(err);
      }
    }.bind(this));
  },
  
  addUserInSpace: function(username, space, ws, cb) {
    console.log("[websockets] user "+username+" in "+space.access_mode +" space " +  space._id + " with socket "  +  ws.id);
    
    this.state.set(ws.id+"", username+"", function(err, res) {
      if(err) console.error(err, res);
      else {
        this.state.sadd("space_" + space._id, ws.id, function(err, res) {
          if(err) cb(err);
          else {
            ws['space_id'] = space._id.toString();

            this.distributeUsers(ws.space_id);
            if(cb)
              cb();
          }
        }.bind(this));
      }
    }.bind(this));
  },
  removeUserInSpace: function(spaceId, ws, cb) {
    this.state.srem("space_" + spaceId, ws.id+"", function(err, res) {
      if (err) cb(err);
      else {
        console.log("[websockets] socket "+  ws.id + " went offline in space " + spaceId);
        this.distributeUsers(spaceId);
        ws['space_id'] = null;

        if (cb)
          cb();
      }
    }.bind(this));
  },

  distributeUsers: function(spaceId) {
    if (!spaceId)
      return;

    /*this.state.smembers("space_" + spaceId, function(err, list) {
      async.map(list, function(item, callback) {
        this.state.get(item, function(err, userId) {
          console.log(item, "->", userId);
          callback(null, userId);
        });
      }.bind(this), function(err, userIds) {
        const uniqueUserIds = _.unique(userIds);
        const validUserIds = _.filter(uniqueUserIds, function(uId) {
          return mongoose.Types.ObjectId.isValid(uId);
        });

        const nonValidUserIds = _.filter(uniqueUserIds, function(uId) {
          return (uId !== null && !mongoose.Types.ObjectId.isValid(uId));
        });

        const anonymousUsers = _.map(nonValidUserIds, function(nonValidId) {
          const realNickname = nonValidId.slice(nonValidId.indexOf("-")+1);
          return {nickname: realNickname, email: null, avatar_thumbnail_uri: null };
        });

        db.User.findAll({where: {
          "_id" : { "$in" : validUserIds }}, attributes: ["nickname","email","avatar_thumbnail_uri"]})
          .then(users) {
            const allUsers = users.concat(anonymousUsers);
            const strUsers = JSON.stringify({users: allUsers, space_id: spaceId});
            this.state.publish("users", strUsers);
          }.bind(this));
      }.bind(this));
    }.bind(this));*/
  }
};
