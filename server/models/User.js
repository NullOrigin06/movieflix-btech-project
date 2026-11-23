// A "model" describes what one document in a MongoDB collection looks like.
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored as a hash, never plain text
  // "My List" = an array of movie ids that this user saved
  myList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  // "Continue Watching" = movies the user opened recently (newest first)
  watching: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = mongoose.model("User", userSchema);
