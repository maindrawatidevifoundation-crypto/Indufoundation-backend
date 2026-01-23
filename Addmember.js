// Addmember.js
const express = require("express");
const router = express.Router();
const Member = require("./member"); // check path

// POST /join
router.post("/join", async (req, res) => {
  try {
    const rolePrefix = {
      "Secretary": "SEC",
      "Volunteer Coordinator": "VOL",
      "Treasurer/Finance": "TRE",
      "Field Operations Manager": "FOM",
      "Technical Coordinator": "TEC",
      "Monitoring & Evaluation Officer": "MEO",
      "Communication & Fundraising Coordinator": "COM"
    };

    const prefix = rolePrefix[req.body.interest] || "GEN";
    const uniqueNumber = Date.now().toString().slice(-4); // last 4 digits of timestamp
    const memberId = `${prefix}${uniqueNumber}2026`; // official ID

    const newMember = new Member({
      name: req.body.name,
      mobile: req.body.mobile,
      interest: req.body.interest,
      memberId: memberId
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
