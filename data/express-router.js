const express = require("express");

const postDb = require("./helpers/postDb.js");
const userDb = require("./helpers/userDb.js");

const router = express.Router();

// GET request to /api/users
router.get("/users/", async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json("Aint no users here, yall");
  }
});

// GET request to /api/users/:id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ error: "You must be crazy, that user doesnt exist!." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "I dunno where that user is, but they aint here!" });
  }
});

// GET request to /api/posts
router.get("/posts/", async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Aint no posts here, yall");
  }
});

// GET request to /api/posts/:id
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await postDb.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ error: "Ehhh... I dont think that post exists, mate" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The post you seek... it is not here." });
  }
});

module.exports = router;
