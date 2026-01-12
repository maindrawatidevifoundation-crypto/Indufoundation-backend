require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================== MongoDB Connection ==================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ================== Member Schema ==================
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  interest: {
    type: String,
    required: true
  },
  memberId: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Member = mongoose.model("Member", memberSchema);

// ================== APIs ==================

// Health check
app.get("/", (req, res) => {
  res.send("NGO Backend is Running ✅");
});

// Join NGO (POST)
app.post("/join", async (req, res) => {
  try {
    const { name, mobile, interest } = req.body;

    if (!name || !mobile || !interest) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const count = await Member.countDocuments();
    const memberId = `MIDNSF-${new Date().getFullYear()}-${count + 1}`;

    const newMember = new Member({
      name,
      mobile,
      interest,
      memberId
    });

    await newMember.save();

    res.json({
      success: true,
      message: "Member joined successfully",
      memberId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all members (GET)
app.get("/members", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================== Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
mongoose.connect(process.env.MONGODB_URI)
