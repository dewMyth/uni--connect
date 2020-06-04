const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  departmentTitle: {
    type: String,
    required: true,
    unique: true,
  },
  departmentImage: {
    type: String,
  },
  departmentDescription: {
    type: String,
    required: true,
  },
  degrees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "degrees",
    },
  ],

  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculties",
  },
});

module.exports = Department = mongoose.model("departments", DepartmentSchema);
