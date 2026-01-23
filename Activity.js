const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  cloudinaryId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Activity", activitySchema);
