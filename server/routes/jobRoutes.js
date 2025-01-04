import express from "express";
import {
  getJobs,
  addJob,
  getJobById,
  updateJobById,
  deleteJobById,
} from "../db.js";

const router = express.Router();

// GET /api/jobs - Get All Jobs route
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await getJobs(); // Fetch jobs from the database
    res.json(jobs); // Send the jobs as JSON response
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// POST /api/jobs - Add a new job
router.post("/jobs", async (req, res) => {
  const newJob = req.body; // Get the job data from the request body

  try {
    const addedJob = await addJob(newJob); // Assuming this function adds the job to the database
    res.status(201).json(addedJob); // Return the added job with a 201 status
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(400).json({ error: "Failed to add job" });
  }
});

// GET /api/jobs/:id - Get a single job by ID
router.get("/jobs/:id", async (req, res) => {
  const { id } = req.params; // Get the job ID from the URL parameters

  try {
    const job = await getJobById(id); // Fetch the job by its ID from the database
    console.log("ID IN JOBROUTES:", id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" }); // Handle job not found
    }
    res.json(job); // Send the job as a JSON response
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// PUT /api/jobs/:id - Update a job by ID
router.put("/jobs/:id", async (req, res) => {
  const { id } = req.params; // Get the job ID from the URL parameters
  const updatedJob = req.body; // Get the updated job data from the request body

  console.log("jobRoutes.js UPDATE JOB WITH ID:", id, updatedJob);
  try {
    const job = await updateJobById(id, updatedJob); // Update the job by its ID

    if (!job) {
      return res.status(404).json({ error: "Job not found" }); // Handle job not found
    }
    res.json(job); // Send the updated job as a JSON response
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// DELETE /api/jobs/:id - Delete a job by ID
router.delete("/jobs/:id", async (req, res) => {
  const { id } = req.params; // Get the job ID from the URL parameters

  try {
    const isDeleted = await deleteJobById(id); // Try deleting the job by ID
    if (!isDeleted) {
      return res.status(404).json({ error: "Job not found" }); // If no job was deleted
    }
    res.status(200).json({ message: "Job deleted successfully" }); // Respond with success message
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export default router;
