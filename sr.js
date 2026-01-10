mongodb+srv://Maindrawatidevifoundation:<Munukaushik>@cluster0.yos8jrt.mongodb.net/?appName=Cluster0
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Maindrawatidevifoundation:Munukaushik@cluster0.yos8jrt.mongodb.net/myDatabase?retryWrites=true&w=majority";

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
