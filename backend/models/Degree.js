const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DegreeSchema = new Schema({
    degreeTitle: {
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
      degreeDescription: {
        type: String,
        required: true
      }
});

module.exports = Degree = mongoose.model("degrees", DegreeSchema);