const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Auth Header
  const token = authHeader && authHeader.split(" ")[1]; // Extract token after "Bearer"

  if (!token) {
    return res.status(401).json({
      status: "ERROR",
      message: "Access token is required. User Unauthorized.",
    });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({
        status: "ERROR",
        message: "Invalid token. User Unauthorized.",
      });
    }
    req.user = user; // adding user to the request object
    next();
  });
};

module.exports = authMiddleware;
