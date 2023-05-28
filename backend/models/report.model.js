const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String },
  reporter: { type: String, required: true },
  concern: { type: String, required: true },
  post_id: { type: String, required: true },
  name: { type: String, required: true },
  email_sub: { type: String, required: true },
  ign: { type: Boolean, default: false },
});

const model = mongoose.model("report", reportSchema);
module.exports = model;
