const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// GET all activities
router.get("/", async (req, res) => {
  const activities = await Activity.find().sort({ createdAt: -1 });
  res.json(activities);
});

// ADD activity (using Cloudinary URL)
router.post("/", async (req, res) => {
  const { title, imageUrl, cloudinaryId } = req.body;
  const activity = new Activity({ title, imageUrl, cloudinaryId });
  await activity.save();
  res.json(activity);
});

module.exports = router;
