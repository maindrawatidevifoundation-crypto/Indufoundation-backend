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
mongodb+srv://Maindrawatidevifoundation:<db_password>@cluster0.wql8whp.mongodb.net/?appName=Cluster0
npm install mongoose
const mongoose = require('mongoose');

const uri = "mongodb+srv://Maindrawatidevifoundation:<db_password>@cluster0.wql8whp.mongodb.net/?appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));
const mongoose = require('mongoose');
mongodb+srv://Maindrawatidevifoundation:<db_password>@cluster0.wql8whp.mongodb.net/?appName=Cluster0
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Maindrawatidevifoundation:<db_password>@cluster0.wql8whp.mongodb.net/?appName=Cluster0
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");

    const database = client.db("myDatabase");
    const collection = database.collection("members");

    // Example: fetch all members
    const members = await collection.find({}).toArray();
    console.log(members);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
    
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});
require("dotenv").config();
