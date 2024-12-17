import http from "http";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/jobs" && req.method === "GET") {
    try {
      const jobs = await getData();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(jobs));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to fetch data." }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found." }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
