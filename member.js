// member.js
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String },
  interest: { type: String },
  memberId: { type: String } // ✅ official ID
}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);
