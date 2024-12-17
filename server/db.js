import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const db_password = process.env.DB_PASSWORD;
const db_user = process.env.DB_USER;
const uri = `mongodb+srv://${db_user}:${db_password}@sandboxcluster.0u4mx.mongodb.net/?retryWrites=true&w=majority&appName=SandboxCluster`;
const dbName = "VueJobBoard";

let client;
let db;

/**
 * Initialize MongoDB Connection
 */
async function initializeDb() {
  if (!client) {
    client = new MongoClient(uri);

    try {
      await client.connect();
      console.log("Connected to MongoDB!");
      db = client.db(dbName);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  return db;
}

/**
 * Get Data from the Jobs Collection
 * @returns {Promise<Array>} - List of jobs from the database
 */
export async function getJobs() {
  try {
    const db = await initializeDb();
    const jobs = await db.collection("Jobs").find({}).toArray();
    return jobs;
  } catch (error) {
    console.error("Error fetching data from Jobs collection:", error);
    throw error;
  }
}

/**
 * Add a New Job to the Jobs Collection
 * @param {Object} job - The job object to be added
 * @returns {Promise<Object>} - The inserted job
 */
export async function addJob(job) {
  try {
    const db = await initializeDb();
    const result = await db.collection("Jobs").insertOne(job); // Insert the job into the collection
    return { _id: result.insertedId, ...job }; // Return the job with the generated ID
  } catch (error) {
    console.error("Error inserting data into Jobs collection:", error);
    throw error;
  }
}

// Add the following functions to db.js

/**
 * Get a single job by its ID
 * @param {string} id - The job ID
 * @returns {Promise<Object>} - The job data
 */
export async function getJobById(id) {
  try {
    const db = await initializeDb();
    const job = await db.collection("Jobs").findOne({ _id: new ObjectId(id) });
    return job;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
}

/**
 * Update a job by its ID
 * @param {string} id - The job ID
 * @param {Object} updatedJob - The updated job data
 * @returns {Promise<Object>} - The updated job data
 */
export async function updateJobById(id, updatedJob) {
  console.log("db.js UPDATE JOB WITH ID:", id, updatedJob);
  try {
    const db = await initializeDb();
    const result = await db.collection("Jobs").updateOne(
      { _id: new ObjectId(id) }, // Find the job by ID
      { $set: updatedJob } // Set the updated data
    );

    if (result.matchedCount === 0) {
      return null; // If no job matched the ID, return null
    }

    // Fetch the updated job from the database
    const updated = await db.collection("Jobs").findOne({ _id: new ObjectId(id) });
    return updated; // Return the updated job
  } catch (error) {
    console.error("Error updating job by ID:", error);
    throw error;
  }
}

/**
 * Delete a job by its ID
 * @param {string} id - The job ID
 * @returns {Promise<boolean>} - Returns true if the deletion was successful
 */
export async function deleteJobById(id) {
  try {
    const db = await initializeDb();
    const result = await db.collection("Jobs").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0; // Returns true if a document was deleted
  } catch (error) {
    console.error("Error deleting job by ID:", error);
    throw error;
  }
}

/**
 * Close MongoDB Connection
 */
export async function closeDb() {
  if (client) {
    try {
      await client.close();
      console.log("MongoDB connection closed.");
      client = null;
      db = null;
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
    }
  }
}

// Test
// const jobs = await getJobs();
// console.log(jobs.length);
// closeDb();
