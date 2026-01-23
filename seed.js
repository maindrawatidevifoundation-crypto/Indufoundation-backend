// seed.js
const mongoose = require("mongoose");
require("dotenv").config();
const Member = require("./member");

const MONGO_URL = process.env.MONGODB_URI;

const membersData = [
  { name: "Sanjay Sarpanch", mobile: "N/A", interest: "Secretary", memberId: "SEC0012026" },
  { name: "Rajesh Attri", mobile: "N/A", interest: "Volunteer Coordinator", memberId: "VOL0012026" },
  { name: "Rahul", mobile: "N/A", interest: "Treasurer/Finance", memberId: "TRE0012026" },
  { name: "Ankur Kharb", mobile: "N/A", interest: "Field Operations Manager", memberId: "FOM0012026" },
  { name: "Rambir Kaushik", mobile: "N/A", interest: "Technical Coordinator", memberId: "TEC0012026" },
  { name: "Sonu Kaushik", mobile: "N/A", interest: "Monitoring & Evaluation Officer", memberId: "MEO0012026" },
  { name: "Suresh Sharma", mobile: "N/A", interest: "Communication & Fundraising Coordinator", memberId: "COM0012026" }
];

mongoose.connect(MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected ✅");

    await Member.deleteMany({});
    const result = await Member.insertMany(membersData);

    console.log("Inserted members:");
    result.forEach(m => console.log(m.name, "-", m.memberId));

    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
