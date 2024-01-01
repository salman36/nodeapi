import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
    maxlength: [30, "Name connot exceed 30 character"],
    minlength: [3, "Name should have more than 3 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter Your Password"],
    minlength: [8, "Password should be grater than 8 character"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//// compare password /////
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("user", userSchema);
export default User;
