const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    departmentTitle: {
        type: String,
        required: true
      },
    departmentImage: {
        type: String
      },
    faculty: {
        type: String,
        required: true
      },
    departmentDescription: {
        type: String,
        required: true
      }
});

module.exports = Department = mongoose.model("departments", DepartmentSchema);