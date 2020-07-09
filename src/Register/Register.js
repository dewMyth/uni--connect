import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions.js";
import classnames from "classnames";
import "./Register.css";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      profilePicture: "",
      email: "",
      jobPosition: "",
      workPlaceOne: "",
      studentNo: "",
      degree: "",
      selectedDegree: "",
      department: "",
      selectedDepartment: "",
      faculty: "",
      selectedFaculty: "",
      password: "",
      password2: "",
      errors: {},
      degrees: [],
      departments: [],
      faculties: [],
    };

    this.input = React.createRef();
    this.input2 = React.createRef();
  }

  //Life Cycle Methods
  componentDidMount() {
    //if logged in user navigates to Register page should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    axios.get("/degrees").then((response) => {
      console.log(response.data);
      if (response.data.length > 0) {
        this.setState({
          degrees: response.data.map((degree) => degree.degreeTitle),
          degreeTitle: response.data[0].degreeTitle,
          departments: response.data.map(
            (degree) => degree.department.departmentTitle
          ),
          department: response.data[0].departmentTitle,
          faculties: response.data.map((degree) => degree.faculty.facultyTitle),
          faculty: response.data[0].facultyTitle,
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

  onChangeSelect = (e) => {
    const targetDegree = e.target.value;
    const index = this.state.degrees.indexOf(targetDegree);
    const targetDepartment = this.state.departments[index];
    const targetFaculty = this.state.faculties[index];
    this.input.current.value = targetDepartment;
    this.input2.current.value = targetFaculty;
    this.setState({
      degree: targetDegree,
      department: targetDepartment,
      faculty: targetFaculty,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    this.setState({
      errors: {},
    });
  };

  onChangeProfilePicture = (e) => {
    this.setState({
      profilePicture: e.target.files[0],
    });
  };

  //On Submit method

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = new FormData();

    newUser.set("firstName", this.state.firstName);
    newUser.set("lastName", this.state.lastName);
    newUser.set("profilePicture", this.state.profilePicture);
    newUser.set("email", this.state.email);
    newUser.set("jobPosition", this.state.jobPosition);
    newUser.set("workPlaceOne", this.state.workPlaceOne);
    newUser.set("studentNo", this.state.studentNo);
    newUser.set("degree", this.state.degree);
    newUser.set("department", this.state.department);
    newUser.set("faculty", this.state.faculty);
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
    console.log(newUser);

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
                  <label className="btn btn-primary" style={{ width: "auto" }}>
                    <input
                      // className="form-control"
                      onChange={this.onChangeProfilePicture}
                      placeholder="Profile Picture"
                      name="profilePicture"
                      type="file"
                      style={{ width: "auto" }}
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
                  <input
                    className={classnames(
                      "",
                      { invalid: errors.jobPosition },
                      "form-control"
                    )}
                    value={this.state.jobPosition}
                    onChange={this.onChange}
                    placeholder="Current Occupation"
                    error={errors.jobPosition}
                    id="jobPosition"
                    type="text"
                  />
                </div>
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
                    placeholder="Job Place"
                    error={errors.workPlaceOne}
                    id="workPlaceOne"
                    type="text"
                  />
                </div>
                <span className="text-danger">{errors.workPlaceOne}</span>
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
                    placeholder="Student No used in University"
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
                    onChange={this.onChangeSelect}
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
                  <input
                    className="form-control"
                    type="text"
                    ref={this.input}
                    defaultValue={this.state.departments[0]}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className="form-control"
                    type="text"
                    ref={this.input2}
                    defaultValue={this.state.faculties[0]}
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
