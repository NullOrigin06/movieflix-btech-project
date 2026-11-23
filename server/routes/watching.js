const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const checkLogin = require("../middleware/auth");

const router = express.Router();

// Every route in this file needs the user to be logged in
router.use(checkLogin);

// GET /api/watching -> recently watched movies, newest first
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("watching");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.watching);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not load continue watching" });
  }
});

// POST /api/watching/:movieId -> remember that the user opened this movie
router.post("/:movieId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.movieId)) {
      return res.status(400).json({ message: "Bad movie id" });
    }

    // Step 1: take the movie out if it is already there (so it is not listed twice)
    await User.findByIdAndUpdate(req.userId, {
      $pull: { watching: req.params.movieId },
    });

    // Step 2: put it at the front. Keep only the newest 10.
    await User.findByIdAndUpdate(req.userId, {
      $push: {
        watching: { $each: [req.params.movieId], $position: 0, $slice: 10 },
      },
    });

    res.json({ message: "Saved to Continue Watching" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not save" });
  }
});

// DELETE /api/watching/:movieId -> remove one movie from the row
router.delete("/:movieId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.movieId)) {
      return res.status(400).json({ message: "Bad movie id" });
    }
    await User.findByIdAndUpdate(req.userId, {
      $pull: { watching: req.params.movieId },
    });
    res.json({ message: "Removed from Continue Watching" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not remove" });
  }
});

module.exports = router;
