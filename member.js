const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String },
  interest: { type: String },
  memberId: { type: String } // <- This is REQUIRED to save IDs
});

module.exports = mongoose.model("Member", memberSchema);
