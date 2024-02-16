const { JWT_SECRET } = require("../config");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const test = async (req, res) => {
  res.json("Testing");
};
const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    return res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Invalid information");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "No user has been found" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }
    const token = await user.createJWT();
    return res.status(200).send({ user: { name: user.name }, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  test,
  register,
  login,
};
