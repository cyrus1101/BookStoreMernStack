const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide user name"],
  },
  password: {
    type: String,
    required: [true, "Please provide user password"],
    minLength: [6, " Pleas provide at least 6 charactors"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
  },
});
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.createJWT = function () {
  return jwt.sign({ name: this.name, userId: this._id }, JWT_SECRET, {
    expiresIn: "2d",
  });
};
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", UserSchema);
