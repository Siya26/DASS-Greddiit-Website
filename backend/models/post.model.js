const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  email: { type: String, required: true },
  upvote: { type: Array, default: [] },
  downvote: { type: Array, default: [] },
  comment: { type: Array, default: [] },
  email_post: { type: String, required: true },
});

const model = mongoose.model("post", postSchema);
module.exports = model;
