// server.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ================== App Initialization ==================
const app = express();

// ================== Middlewares ==================
app.use(cors());
app.use(express.json());

// ================== MongoDB Connection ==================
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ================== Member Schema & Model ==================
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  interest: { type: String, required: true },
  memberId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Member = mongoose.model("Member", memberSchema);

// ================== Activity Schema & Model ==================
const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

const Activity = mongoose.model("Activity", activitySchema);

// ================== Routes ==================

// Health Check
app.get("/", (req, res) => {
  res.send("NGO Backend is Running ✅");
});

// ====== Members Routes ======

// Join NGO (POST)
app.post("/join", async (req, res) => {
  try {
    const { name, mobile, interest } = req.body;

    if (!name || !mobile || !interest) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const count = await Member.countDocuments();
    const memberId = `MIDNSF-${new Date().getFullYear()}-${count + 1}`;

    const newMember = new Member({
      name,
      mobile,
      interest,
      memberId,
    });

    await newMember.save();

    res.json({
      success: true,
      message: "Member joined successfully",
      memberId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
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

// ====== Activities Routes ======

// Get all activities (GET)
app.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities" });
  }
});

// Add new activity (POST) - optional, future use
app.post("/activities", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newActivity = new Activity({ title, description, date });
    await newActivity.save();
    res.json({ success: true, message: "Activity added successfully", activity: newActivity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================== Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
  
              
