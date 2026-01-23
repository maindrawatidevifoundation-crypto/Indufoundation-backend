const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String },
  interest: { type: String },
  memberId: { type: String }, // ✅ IMPORTANT
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Member", memberSchema);
