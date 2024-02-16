const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token has been provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = authenticationMiddleware;
