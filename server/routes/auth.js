const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const authAttempts = new Map();
const AUTH_LIMIT = 20;
const AUTH_WINDOW_MS = 15 * 60 * 1000;

// A small in-memory limiter is enough for this single-service student project.
function authRateLimit(req, res, next) {
  const key = req.ip || req.socket?.remoteAddress || "unknown";
  const now = Date.now();
  let attempt = authAttempts.get(key);

  if (!attempt || now >= attempt.resetAt) {
    attempt = { count: 0, resetAt: now + AUTH_WINDOW_MS };
  }

  attempt.count += 1;
  authAttempts.set(key, attempt);

  if (attempt.count > AUTH_LIMIT) {
    return res.status(429).json({ message: "Too many login attempts. Please try again later." });
  }

  next();
}

// Make a token that says "this is user X". It lasts 7 days.
function makeToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// POST /api/auth/register
router.post("/register", authRateLimit, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // is the email already used?
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "That email is already registered" });
    }

    // hash the password so we never store the real one
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
    });

    res.status(201).json({
      token: makeToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// POST /api/auth/login
router.post("/login", authRateLimit, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    // compare typed password with the stored hash
    const match = await bcrypt.compare(password || "", user.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    res.json({
      token: makeToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
module.exports.authRateLimit = authRateLimit;
module.exports.resetAuthAttempts = () => authAttempts.clear();
