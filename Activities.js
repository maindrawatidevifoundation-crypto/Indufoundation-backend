const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  year: String
});

module.exports = mongoose.model("Activity", activitySchema);
