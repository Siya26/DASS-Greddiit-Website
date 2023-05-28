const mongoose = require("mongoose");

const gredditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  tags: { type: Array, required: true },
  ban: { type: Array, required: true },
  createTime : {type: Date, default: Date.now()},
  email: { type: String, required: true },
  my: { type: Array, default: []},
  users: { type: Array, default: []},
  blocked_users: { type: Array, default: [] },
  left_users: { type: Array, default: [] },
  posts: { type: Array, default: [] },
  no_posts: { type: Number, default: 0 },
});

const model = mongoose.model("greddit", gredditSchema);
module.exports = model;
