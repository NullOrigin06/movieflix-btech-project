const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["Movie", "Show"], required: true, default: "Movie" },
  description: { type: String, required: true },
  genre: { type: String, required: true }, // e.g. "Action", "Sci-Fi"
  year: { type: Number },
  rating: { type: String }, // e.g. "PG-13"
  posterUrl: { type: String }, // image shown on the card
  trailerId: { type: String, required: true }, // YouTube video id
});

module.exports = mongoose.model("Movie", movieSchema);
