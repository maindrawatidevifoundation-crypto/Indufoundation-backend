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
