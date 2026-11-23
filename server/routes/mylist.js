const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const checkLogin = require("../middleware/auth");

const router = express.Router();

// Every route in this file needs the user to be logged in
router.use(checkLogin);

// GET /api/mylist -> the movies this user saved
router.get("/", async (req, res) => {
  try {
    // populate = replace the saved ids with the full movie documents
    const user = await User.findById(req.userId).populate("myList");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.myList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not load your list" });
  }
});

// POST /api/mylist/:movieId -> add a movie
router.post("/:movieId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.movieId)) {
      return res.status(400).json({ message: "Bad movie id" });
    }
    // $addToSet adds the id only if it is not already in the array
    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { myList: req.params.movieId },
    });
    res.json({ message: "Added to My List" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not add to list" });
  }
});

// DELETE /api/mylist/:movieId -> remove a movie
router.delete("/:movieId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.movieId)) {
      return res.status(400).json({ message: "Bad movie id" });
    }
    await User.findByIdAndUpdate(req.userId, {
      $pull: { myList: req.params.movieId },
    });
    res.json({ message: "Removed from My List" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not remove from list" });
  }
});

module.exports = router;
