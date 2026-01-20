const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  year: {
    type: String
  }
});

module.exports = mongoose.model("Activity", activitySchema);
const express = require("express");
const router = express.Router();
const Activity = require("../models/activity"); // path check

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
  
