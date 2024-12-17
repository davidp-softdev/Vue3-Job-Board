// server.js
import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js"; // Import the job routes

const app = express();
const PORT = 5000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json()); // This is crucial to parse incoming JSON data in POST requests

// Use the job routes
app.use("/api", jobRoutes); // All routes in jobRoutes.js will be prefixed with '/api'

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
