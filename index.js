const express = require("express");

const postsRouter = require("./posts/postsRouter");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Hello from Express!<h1>`);
});

const port = 8000;

server.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
