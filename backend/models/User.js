const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    default : Date.now
  },
  profilePicture: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  workPlaceOne: {
    type: String,
    required: true
  },
  workPlaceTwo: {
    type: String
  },
  averageSalaray: {
    type: String
  },
  studentNo: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },  
  department: {
    type: String,
    required: true
  },  
  faculty: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  password : {
      type : String,
      required: true
  }

});

module.exports = User = mongoose.model("users", UserSchema);