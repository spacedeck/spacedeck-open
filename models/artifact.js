'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.artifactSchema = Schema({
  mime: String,
  thumbnail_uri: String,
  space_id: Schema.Types.ObjectId,
  user_id: {type: Schema.Types.ObjectId, ref: 'User' },
  last_update_user_id: {type: Schema.Types.ObjectId, ref: 'User' },
  editor_name: String,
  last_update_editor_name: String,
  description: String,
  state: {type: String, default: "idle"},
  meta: {
    linked_to: [String],
    title: String,
    tags: [String],
    search_text: String,
    link_uri: String,
    play_from: Number,
    play_to: Number,
  },
  board: {
    x: {type: Number, default: 0.0},
    y: {type: Number, default: 0.0},
    z: {type: Number, default: 0.0},
    r: {type: Number, default: 0.0},
    w: {type: Number, default: 100},
    h: {type: Number, default: 100},
  },
  control_points: [{
    dx: Number, dy: Number
  }],
  group:{type: String, default: ""},
  locked: {type: Boolean, default: false},
  payload_uri: String,
  payload_thumbnail_web_uri: String,
  payload_thumbnail_medium_uri: String,
  payload_thumbnail_big_uri: String,
  payload_size: Number, // file size in bytes
  style: {
    fill_color: {type: String, default: "transparent"},
    stroke_color:{type: String, default: "#000000"},
    text_color: String,
    stroke: {type: Number, default: 0.0},
    stroke_style: {type: String, default: "solid"},
    alpha: {type: Number, default: 1.0},
    order: {type: Number, default: 0},
    crop: {
      x: Number,
      y: Number,
      w: Number,
      h: Number
    },
    shape: String,
    shape_svg: String,
    padding_left: Number,
    padding_right: Number,
    padding_top: Number,
    padding_bottom: Number,
    margin_left: Number,
    margin_right: Number,
    margin_top: Number,
    margin_bottom: Number,
    border_radius: Number,
    align: {type: String, default: "left"},
    valign: {type: String, default: "top"},
    brightness: Number,
    contrast: Number,
    saturation: Number,
    blur: Number,
    hue: Number,
    opacity: Number
  },
  payload_alternatives: [{
    mime: String,
    payload_uri: String,
    payload_thumbnail_web_uri: String,
    payload_thumbnail_medium_uri:  String,
    payload_thumbnail_big_uri: String,
    payload_size: Number
  }],
  created_at: {type: Date, default: Date.now},
  created_from_ip: {type: String},
  updated_at: {type: Date, default: Date.now}
});
