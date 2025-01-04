import { MongoClient } from "mongodb";
// CommonJS: Default syntax if no "type": "module"
// const { MongoClient } = require("mongodb");

const db_user = "";
const db_password = "";
const uri = `mongodb+srv://dbuser:${db_password}@sandboxcluster.0u4mx.mongodb.net/?retryWrites=true&w=majority&appName=SandboxCluster`;

// import { promisify } from "util";
// console.log(typeof promisify); // Should print 'function'
const dbName = "VueJobBoard";

async function connectDb() {
  const client = new MongoClient(uri);
  // await client.connect();
  // const db = client.db("fsv-db");
  // const jobs = await db.collection("Jobs").find({}).toArray();
  // console.log("Db Jobs : ", jobs);
  // return jobs;

  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // await client.close();
  }
}

const db = await connectDb();

if (!db) {
  console.error("Failed to connect to the database.");
} else {
  console.log("Database found!");
  const jobs = await db.collection("Jobs").find({}).toArray();
  console.log("Db Jobs : ", jobs);
}

export default connectDb;
