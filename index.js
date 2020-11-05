const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  console.log("Hello from express!");
});

const port = 8000;

server.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
