// const axios = require("axios"); // CommonJS
import axios from "axios"; // ES Module

axios
  .get("https://api.github.com")
  .then((response) => {
    console.log("Axios is working:", response.status);
  })
  .catch((error) => {
    console.error("Axios encountered an error:", error);
  });
