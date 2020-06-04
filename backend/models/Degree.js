const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DegreeSchema = new Schema({
  degreeTitle: {
    type: String,
    required: true,
    unique: true,
  },
  degreeDescription: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculties",
  },
});

module.exports = Degree = mongoose.model("degrees", DegreeSchema);
