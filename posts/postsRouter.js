const express = require("express");

const db = require("../data/db");

const router = express.Router();

router.post("/", (req, res) => {
  db.insert(req.body)
    .then((post) => {
      if (!req.body.title || !req.body.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        res.status(201).json(post);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database.",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  db.insertComment(req.body.id)
    .then((comment) => {
      if (!comment) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!req.body.text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment. " });
      } else {
        res.status(201).json(comment);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});

router.get("/", (req, res) => {
  db.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json({ message: "The post has been destroyed" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db.update(req.params.id, changes)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else if (!req.body.title || !req.body.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post",
        });
      } else {
        res.status(200).json({ post });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be modified" });
    });
});

module.exports = router;
