const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String },
  interest: { type: String },
  memberId: { type: String }  // ✅ Make sure this line exists
});

module.exports = mongoose.model("Member", memberSchema);
