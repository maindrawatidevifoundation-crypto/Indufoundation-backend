const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect (abhi blank chhodo)
mongoose.connect("MONGODB_URL_HERE")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Member schema
const Member = mongoose.model("Member", new mongoose.Schema({
  name: String,
  mobile: String,
  interest: String,
  memberId: String,
  createdAt: { type: Date, default: Date.now }
}));

// Add member API
app.post("/join", async (req, res) => {
  const count = await Member.countDocuments();
  const memberId = `MIDNSF-${new Date().getFullYear()}-${count + 1}`;

  const member = new Member({
    name: req.body.name,
    mobile: req.body.mobile,
    interest: req.body.interest,
    memberId
  });

  await member.save();
  res.json({ success: true, memberId });
});

// Get all members API
app.get("/members", async (req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.json(members);
});

// Start server
app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
