'use strict';

const config = require('config');

// this is a mock version of the Redis API,
// emulating Redis if it is not available locally
var notRedis = {
  state: {},
  topics: {},
  
  publish: function(topic, msg, cb) {
    if (!this.topics[topic]) {
      this.topics[topic] = {
        subscribers: []
      };
    }
    var t=this.topics[topic];
    for (var i=0; i<t.subscribers.length; i++) {
      var s=t.subscribers[i];
      if (s.handler) {
        s.handler(topic, msg);
      }
    }
    if (cb) cb(null);
  },

  subscribe: function(topics, cb) {
    var handle = {
      handler: null,
      on: function(evt, cb) {
        if (evt == "message") {
          this.handler = cb;
        }
      }
    };
    
    for (var i=0; i<topics.length; i++) {
      var topic = topics[i];
      if (!this.topics[topic]) {
        this.topics[topic] = {
          subscribers: []
        };
      }
    
      var t=this.topics[topic];
      t.subscribers.push(handle);
    }

    cb(null, topics.length);
    return handle;
  },

  get: function(key, cb) {
    cb(null, this.state[key]);
    return this.state[key];
  },

  set: function(key, val, cb) {
    this.state[key] = val;
    cb();
  },

  del: function(key, cb) {
    delete this.state[key];
    cb(null);
  },

  sadd: function(key, skey, cb) {
    if (!this.state[key]) this.state[key] = {};
    this.state[key][skey] = true;
    cb(null);
  },

  srem: function(key, skey, cb) {
    if (this.state[key]) {
      delete this.state[key][skey];
    }
    cb(null);
  },

  smembers: function(key, cb) {
    cb(null, Object.keys(this.state[key]));
  },

  incr: function(key, cb) {
    if (!this.state[key]) this.state[key] = 0;
    this.state[key]++;
    cb(null, this.state[key]);
  },

  expire: function() {
  },
}

module.exports = {
  connectRedis: function() {
    if (config.get("redis_mock")) {
      this.connection = notRedis;
    } else {
      const redisHost = process.env.REDIS_PORT_6379_TCP_ADDR || 'sync';
      this.connection = new RedisConnection(6379, redisHost);
    }
  },
  getConnection: function() {
    this.connectRedis();
    return this.connection;
  },
  sendMessage: function(action, model, attributes, channelId) {
    const data = JSON.stringify({
      channel_id: channelId,
      action: action,
      model: model,
      object: attributes
    });
    this.connection.publish('updates', data);
  },
  logIp: function(ip, cb) {
    this.connection.incr("ip_"+ ip, (err, socketCounter) => {
      cb();
    });
  },
  rateLimit: function(namespace, ip, cb) {
    const key = "limit_"+ namespace + "_"+ ip;
    const redis = this.connection;

    redis.get(key, (err, count)=> {
      if (count) {
        if(count < 150) {
          redis.incr(key, (err, newCount) => {
            if (newCount==150) {
              // limit
            }
            cb(true);
          });
        } else {
          cb(false);
        }
      } else {
        redis.set(key, 1, (err, count) => {
          redis.expire(key, 1800, (err, expResult) => {
            cb(true);
          });
        });
      }
    });
  }, 
  isOnlineInSpace: function(user, space, cb) {
    this.connection.smembers("space_" + space._id.toString(), function(err, list) {
      if (err) cb(err);
      else {
        var users = list.filter(function(item) {
          return user._id.toString() === item;
        });
        cb(null, (users.length > 0));
      }
    });
  }
};

return module.exports;

