'use strict';

const RedisConnection = require('ioredis');
const websockets = require('./websockets');

module.exports = {
  connectRedis(){
    const redisHost = process.env.REDIS_PORT_6379_TCP_ADDR || 'sync';
    this.connection = new RedisConnection(6379, redisHost);
  },
  sendMessage(action, model, attributes, channelId) {
    const data = JSON.stringify({
      channel_id: channelId,
      action: action,
      model: model,
      object: attributes
    });
    this.connection.publish('updates', data);
  },
  logIp(ip, cb) {
    this.connection.incr("ip_"+ ip, (err, socketCounter) => {
      cb();
    });
  },
  rateLimit(namespace, ip, cb) {
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
  isOnlineInSpace(user, space, cb) {
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
