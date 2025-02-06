const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
