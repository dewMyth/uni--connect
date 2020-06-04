const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FacultySchema = new Schema({
  facultyTitle: {
    type: String,
    required: true,
  },
  facultyImage: {
    type: String,
  },
  facultyDescription: {
    type: String,
    required: true,
  },
  departments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
    },
  ],
});

module.exports = Faculty = mongoose.model("faculties", FacultySchema);
