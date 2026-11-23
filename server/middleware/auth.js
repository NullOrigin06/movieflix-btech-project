// Middleware = a function that runs BEFORE the route handler.
// This one checks that the request has a valid login token.
const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
  // The browser sends:  Authorization: Bearer <token>
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Please log in first" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // remember who is calling
    next(); // go on to the real route
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = checkLogin;
