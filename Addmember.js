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
