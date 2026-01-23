const fetch = require("node-fetch"); // npm install node-fetch@2

const BACKEND_URL = "https://indufoundation-backend-11.onrender.com"; // Your backend URL

const members = [
  { name: "Sanjay", role: "Secretary - Sarpanch" },
  { name: "Rajesh Attri", role: "Volunteer coordinator" },
  { name: "Rahul", role: "Treasure account and finance officer" },
  { name: "Ankur Kharb", role: "Field operations manager" },
  { name: "Rambir Kaushik", role: "Technical coordinator" },
  { name: "Sonu Kaushik", role: "Monitoring and evaluation officer" },
  { name: "Suresh Sharma", role: "Communication and fundraising coordinator" }
];

async function addMembers() {
  for (let m of members) {
    try {
      const res = await fetch(BACKEND_URL + "/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(m)
      });

      const data = await res.json();
      if (data.success) {
        console.log(`✅ Added: ${m.name} | Member ID: ${data.memberId}`);
      } else {
        console.log(`⚠️ Failed: ${m.name} | ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error(`❌ Error adding ${m.name}:`, err.message);
    }
  }
}

addMembers();
const express = require("express");
const router = express.Router();
const Member = require("../models/Member"); // path check karo

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
    const memberId = `${prefix}${uniqueNumber}2026`;

    const newMember = new Member({
      name: req.body.name,
      mobile: req.body.mobile,
      interest: req.body.interest,
      memberId: memberId
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
      
