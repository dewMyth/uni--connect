import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions.js";
import classnames from "classnames";
import "./Register.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      profilePicture: "",
      email: "",
      phone: "",
      workPlaceOne: "",
      workPlaceTwo: "",
      averageSalaray: "",
      studentNo: "",
      degree: "",
      department: "",
      faculty: "",
      bio: "",
      password: "",
      password2: "",
      errors: {},
      faculties: [],
      departments: [],
      degrees: [],
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 1 / 1,
      },
      croppedImageUrl: null,
    };
  }

  //Life Cycle Methods
  componentDidMount() {
    //if logged in user navigates to Register page should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    axios.get("/faculties").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          faculties: response.data.map((faculty) => faculty.facultyTitle),
          facultyTitle: response.data[0].facultyTitle,
        });
      }
    });

    axios.get("/departments").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          departments: response.data.map(
            (department) => department.departmentTitle
          ),
          departmentTitle: response.data[0].departmentTitle,
        });
      }
    });

    axios.get("/degrees").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          degrees: response.data.map((degree) => degree.degreeTitle),
          degreeTitle: response.data[0].degreeTitle,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  //On Change Methods

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeDate = (date) => {
    this.setState({
      dateOfBirth: date,
    });
  };

  onChangePhone = (phone) => {
    this.setState({
      phone: phone,
    });
  };

  onChangeProfilePicture = (e) => {
    this.setState({
      profilePicture: e.target.files[0],
    });
  };

  onChangeCrop = (crop) => {
    this.setState({
      crop: crop,
    });
  };

  //On Submit method

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = new FormData();

    newUser.set("firstName", this.state.firstName);
    newUser.set("lastName", this.state.lastName);
    newUser.set("dateOfBirth", this.state.dateOfBirth);
    newUser.append("profilePicture", this.state.profilePicture);
    newUser.set("email", this.state.email);
    newUser.set("phone", this.state.phone);
    newUser.set("workPlaceOne", this.state.workPlaceOne);
    newUser.set("workPlaceTwo", this.state.workPlaceTwo);
    newUser.set("averageSalary", this.state.averageSalary);
    newUser.set("studentNo", this.state.studentNo);
    newUser.set("degree", this.state.degree);
    newUser.set("department", this.state.department);
    newUser.set("faculty", this.state.faculty);
    newUser.set("bio", this.state.bio);
    newUser.set("password", this.state.password);
    newUser.set("password2", this.state.password2);

    // const newUser = {
    //     firstName : this.state.firstName,
    //     lastName : this.state.lastName,
    //     dateOfBirth : this.state.dateOfBirth,
    //     profilePicture : this.state.profilePicture.name,
    //     email : this.state.email,
    //     phone : this.state.phone,
    //     workPlaceOne : this.state.workPlaceOne,
    //     workPlaceTwo : this.state.workPlaceTwo,
    //     averageSalary : this.state.averageSalary,
    //     studentNo : this.state.studentNo,
    //     degree : this.state.degree,
    //     department : this.state.department,
    //     faculty : this.state.faculty,
    //     bio : this.state.bio,
    //     password : this.state.password,
    //     password2 : this.state.password2
    // }

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="logo">
          <img src="images/logo.png" alt="logo" width="auto" height="60px" />
          <p>A Social Network for Alumni of University of Kelaniya</p>
        </div>

        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className="reg row">
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <div className="reg row">
                  <input
                    className={classnames(
                      "",
                      { invalid: errors.firstName },
                      "form-control"
                    )}
                    value={this.state.firstName}
                    onChange={this.onChange}
                    placeholder="First Name"
                    error={errors.firstName}
                    id="firstName"
                    type="text"
                  />
                </div>
                <span className="text-danger">{errors.firstName}</span>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className={classnames(
                      "",
                      { invalid: errors.lastName },
                      "form-control"
                    )}
                    value={this.state.lastName}
                    onChange={this.onChange}
                    placeholder="Last Name"
                    error={errors.lastName}
                    id="lastName"
                    type="text"
                  />
                </div>
                <span className="text-danger">{errors.lastName}</span>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <label>Date of Birth : </label>
                  <DatePicker
                    className="form-control-date"
                    selected={this.state.dateOfBirth}
                    onChange={this.onChangeDate}
                    id="dateOfBirth"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <label className="label-profile-pic btn btn-primary">
                    <input
                      className="form-control"
                      onChange={this.onChangeProfilePicture}
                      placeholder="Profile Picture"
                      name="profilePicture"
                      type="file"
                    />
                    Add a Profile Picture
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className={classnames(
                      "",
                      { invalid: errors.email },
                      "form-control"
                    )}
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="Email"
                    error={errors.email}
                    id="email"
                    type="email"
                  />
                </div>
              </div>
              <span className="text-danger">{errors.email}</span>

              <div className="form-group">
                <div className="reg row">
                  <PhoneInput
                    defaultCountry="LK"
                    className={classnames(
                      "",
                      { invalid: errors.phone },
                      "form-control"
                    )}
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    placeholder="Phone"
                    error={errors.phone}
                    id="phone"
                  />
                </div>
                <span className="text-danger">{errors.phone}</span>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className={classnames(
                      "",
                      { invalid: errors.workPlaceOne },
                      "form-control"
                    )}
                    value={this.state.workPlaceOne}
                    onChange={this.onChange}
                    placeholder="Work Place 1"
                    error={errors.workPlaceOne}
                    id="workPlaceOne"
                    type="text"
                  />
                </div>
                <span className="text-danger">{errors.workPlaceOne}</span>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className="form-control"
                    value={this.state.workPlaceTwo}
                    onChange={this.onChange}
                    placeholder="Work Place 2"
                    id="workPlaceTwo"
                    type="text"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className="form-control"
                    value={this.state.averageSalary}
                    onChange={this.onChange}
                    placeholder="Average Salary"
                    id="averageSalary"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 right">
              <div className="form-group">
                <div className="reg row">
                  <input
                    className={classnames(
                      "",
                      { invalid: errors.studentNo },
                      "form-control"
                    )}
                    value={this.state.studentNo}
                    onChange={this.onChange}
                    placeholder="Student No"
                    error={errors.studentNo}
                    id="studentNo"
                  />
                </div>
                <span className="text-danger">{errors.studentNo}</span>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <select
                    required
                    className={classnames(
                      "",
                      { invalid: errors.degree },
                      "form-control"
                    )}
                    value={this.state.degree}
                    placeholder="Degree"
                    error={errors.degree}
                    id="degree"
                    onChange={this.onChange}
                  >
                    {this.state.degrees.map(function (degree) {
                      return (
                        <option key={degree} value={degree}>
                          {degree}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <span className="text-danger">{errors.degree}</span>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <select
                    required
                    className={classnames(
                      "",
                      { invalid: errors.department },
                      "form-control"
                    )}
                    value={this.state.department}
                    placeholder="Department"
                    error={errors.department}
                    id="department"
                    onChange={this.onChange}
                  >
                    {this.state.departments.map(function (department) {
                      return (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <span className="text-danger">{errors.department}</span>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <select
                    required
                    className={classnames(
                      "",
                      { invalid: errors.faculty },
                      "form-control"
                    )}
                    value={this.state.faculty}
                    placeholder="Faculty"
                    error={errors.faculty}
                    id="faculty"
                    onChange={this.onChange}
                  >
                    {this.state.faculties.map(function (faculty) {
                      return (
                        <option key={faculty} value={faculty}>
                          {faculty}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <span className="text-danger">{errors.faculty}</span>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <textarea
                    className="form-control"
                    value={this.state.bio}
                    onChange={this.onChange}
                    id="bio"
                    placeholder="Bio"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className={classnames(
                      "",
                      { invalid: errors.password },
                      "form-control"
                    )}
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    placeholder="Password"
                    id="password"
                  />
                </div>
                <span className="text-danger">{errors.password}</span>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className={classnames(
                      "",
                      { invalid: errors.password2 },
                      "form-control"
                    )}
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                    placeholder="Confirm Password"
                    id="password2"
                  />
                </div>
                <span className="text-danger">{errors.password2}</span>
              </div>

              <div className="form-group">
                <div className="button">
                  <input
                    type="submit"
                    value="Join"
                    className="btn btn-primary"
                    id="join"
                  />
                </div>
              </div>

              <div className="reg row">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="join-now-text">
                    Connect Now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
