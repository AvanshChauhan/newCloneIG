const jwt = require("jsonwebtoken");

const checkUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "unauthorized access" });
  }

  try {
    // Yaha token verify karke logged-in user ki id req.user me store kar rahe hain.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = {
  checkUser,
};