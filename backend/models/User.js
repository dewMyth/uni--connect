const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Degree = require("../models/Degree");

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    default: Date.now(),
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },

  jobPosition: {
    type: String,
  },

  workPlaceOne: {
    type: String,
  },

  workPlaceTwo: {
    type: String,
  },
  averageSalaray: {
    type: String,
  },
  studentNo: {
    type: String,
    required: true,
  },
  degree: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "degrees",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculties",
  },

  bio: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  },

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],

  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
