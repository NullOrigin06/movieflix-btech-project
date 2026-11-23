// Entry point of the backend. Run it with:  npm run dev
require("dotenv").config(); // loads values from the .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const myListRoutes = require("./routes/mylist");
const watchingRoutes = require("./routes/watching");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header include health checks and local tools.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS"));
    },
  }),
); // lets the configured React app talk to us
app.use(express.json()); // lets us read JSON sent in request bodies

// connect URLs to route files
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/mylist", myListRoutes);
app.use("/api/watching", watchingRoutes);

app.get("/", (req, res) => {
  res.send("Netflix clone API is running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start listening
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  })
  .catch((error) => {
    console.log("Could not connect to MongoDB:", error.message);
  });
