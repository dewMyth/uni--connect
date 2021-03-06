const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.jobPosition = !isEmpty(data.jobPosition) ? data.jobPosition : "";
  data.workPlaceOne = !isEmpty(data.workPlaceOne) ? data.workPlaceOne : "";
  data.studentNo = !isEmpty(data.studentNo) ? data.studentNo : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // FirlaName checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required";
  }
  //Last Name checks
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Job Position checks
  if (Validator.isEmpty(data.jobPosition)) {
    errors.jobPosition = "Job Position field is required";
  }

  //WorkPlace One checks
  if (Validator.isEmpty(data.workPlaceOne)) {
    errors.workPlaceOne = "Work Place is required";
  }

  //Student No checks
  if (Validator.isEmpty(data.studentNo)) {
    errors.studentNo = "Student No field is required";
  }

  //Degree checks
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
