// seed.js
const mongoose = require("mongoose");

// 1️⃣ MongoDB URL (replace <db_password> with actual password)
const MONGO_URL = "mongodb+srv://Maindrawtidevifoundation:<db_password>@cluster0.yos8jrt.mongodb.net/indufoundation?retryWrites=true&w=majority";

// 2️⃣ Define Member schema (same as backend)
const memberSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  interest: String,
  memberId: String,
  createdAt: { type: Date, default: Date.now }
});

const Member = mongoose.model("Member", memberSchema);

// 3️⃣ Members data to insert
const membersData = [
  { name: "Sanjay Sarpanch", mobile: "N/A", interest: "Secretary", memberId: "SEC0012026", createdAt: new Date() },
  { name: "Rajesh Attri", mobile: "N/A", interest: "Volunteer Coordinator", memberId: "VOL0012026", createdAt: new Date() },
  { name: "Rahul", mobile: "N/A", interest: "Treasurer/Finance", memberId: "TRE0012026", createdAt: new Date() },
  { name: "Ankur Kharb", mobile: "N/A", interest: "Field Operations Manager", memberId: "FOM0012026", createdAt: new Date() },
  { name: "Rambir Kaushik", mobile: "N/A", interest: "Technical Coordinator", memberId: "TEC0012026", createdAt: new Date() },
  { name: "Sonu Kaushik", mobile: "N/A", interest: "Monitoring & Evaluation Officer", memberId: "MEO0012026", createdAt: new Date() },
  { name: "Suresh Sharma", mobile: "N/A", interest: "Communication & Fundraising Coordinator", memberId: "COM0012026", createdAt: new Date() }
];

// 4️⃣ Connect to MongoDB and insert
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB Connected ✅");

    // Optional: remove old test members (comment if not needed)
    // await Member.deleteMany({ memberId: { $regex: /2026$/ } });

    // Insert members
    const result = await Member.insertMany(membersData);
    console.log(`Inserted ${result.length} members ✅`);

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
