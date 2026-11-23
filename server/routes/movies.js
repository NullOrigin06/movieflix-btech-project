const express = require("express");
const mongoose = require("mongoose");
const Movie = require("../models/Movie");

const router = express.Router();

// GET /api/movies            -> all movies
// GET /api/movies?genre=Action  -> only that genre
// GET /api/movies?search=bat    -> title contains "bat"
router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.genre) {
      filter.genre = req.query.genre;
    }
    if (req.query.search) {
      // "i" = ignore upper/lower case. Escape special characters first.
      const text = req.query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = new RegExp(text, "i");
    }

    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not load movies" });
  }
});

// GET /api/movies/:id  -> one movie
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not load movie" });
  }
});

module.exports = router;
