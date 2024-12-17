import express from "express";
import cors from "cors";
import { getJobs } from "./db.js";

const app = express();
const PORT = 5000;

// Enable CORS for all origins
app.use(cors());

// API endpoint to fetch jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await getJobs();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
