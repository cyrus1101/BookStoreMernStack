const express = require("express");
const router = express.Router();
const cors = require("cors");
const { register, login } = require("../controllers/authControllers");
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
