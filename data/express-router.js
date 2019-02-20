const express = require("express");

const postDb = require("./helpers/postDb.js");
const userDb = require("./helpers/userDb.js");

const router = express.Router();

// ********** CREATE METHODS ********** //

// POST request to /api/users
router.post("/users", async (req, res) => {
  try {
    const user = await userDb.insert(req.body);

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400).json({
        errorMessage: "Ay! We need a valid user up in here!"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "I'm terribly sorry... we were unable to save your user"
    });
  }
});

// POST request to /api/posts
router.post("/posts", async (req, res) => {
  try {
    const post = await postDb.insert(req.body);

    if (req.body.text && req.body.user_id) {
      res.status(201).json(post);
    } else {
      res.status(400).json({
        errorMessage: "Please provide text and user id for the post."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

// ********** READ METHODS ********** //

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

// Add an endpoint to retrieve the list of posts for a user.
// This should take in a user_id and return the posts with that id

// ********** UPDATE METHODS ********** //

// PUT to /api/posts/:id - Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/posts/:id", async (req, res) => {
  try {
    updated = await postDb.update(req.params.id, req.body);

    if (!req.params.id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (req.body.text && req.body.user_id) {
      res.status(200).json(updated);
    } else {
      res.status(400).json({
        errorMessage: "Please provide text and user id for the post."
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

// ********** DELETE METHODS ********** //

// DELETE to /api/users/:id
router.delete("/users/:id", async (req, res) => {
  try {
    count = await userDb.remove(req.params.id);
    if (count) {
      res.status(200).json({ message: "The user has fallen to the Dark Lord" });
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The user could not be removed" });
  }
});

// DELETE to /api/posts/:id
router.delete("/posts/:id", async (req, res) => {
  try {
    count = await postDb.remove(req.params.id);
    if (count) {
      res
        .status(200)
        .json({ message: "The post has been cast into the fires of Mordor" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

module.exports = router;
