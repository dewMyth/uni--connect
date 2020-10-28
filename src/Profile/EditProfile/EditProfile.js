import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

class EditProfile extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      profilePicture: "",
      email: "",
      phone: "",
      jobPosition: "",
      workPlaceOne: "",
      workPlaceTwo: "",
      averageSalaray: "",
      studentNo: "",
      degree: "",
      department: "",
      faculty: "",
      school: "",
      alStream: "",
      bio: "",
      errors: {},
      faculties: [],
      departments: [],
      degrees: [],
    };
  }

  //Life Cycle Methods
  componentDidMount() {
    axios.get("/users/view/" + this.props.user.id).then((response) => {
      this.setState({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        dateOfBirth: new Date(response.data.dateOfBirth),
        profilePicture: response.data.profilePicture,
        email: response.data.email,
        phone: response.data.phone,
        jobPosition: response.data.jobPosition,
        workPlaceOne: response.data.workPlaceOne,
        workPlaceTwo: response.data.workPlaceTwo,
        studentNo: response.data.studentNo,
        degree: response.data.degree,
        faculty: response.data.faculty,
        department: response.data.department,
        bio: response.data.bio,
        averageSalaray: response.data.averageSalaray,
      });
    });

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
    // const newUser = new FormData();

    // newUser.set("firstName", this.state.firstName);
    // newUser.set("lastName", this.state.lastName);
    // newUser.set("dateOfBirth", this.state.dateOfBirth);
    // newUser.append("profilePicture", this.state.profilePicture);
    // newUser.set("email", this.state.email);
    // newUser.set("phone", this.state.phone);
    // newUser.set("workPlaceOne", this.state.workPlaceOne);
    // newUser.set("workPlaceTwo", this.state.workPlaceTwo);
    // newUser.set("averageSalary", this.state.averageSalary);
    // newUser.set("studentNo", this.state.studentNo);
    // newUser.set("degree", this.state.degree);
    // newUser.set("department", this.state.department);
    // newUser.set("faculty", this.state.faculty);
    // newUser.set("bio", this.state.bio);
    // newUser.set("password", this.state.password);
    // newUser.set("password2", this.state.password2);

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.dateOfBirth,
      profilePicture: this.state.profilePicture.name,
      email: this.state.email,
      phone: this.state.phone,
      jobPosition: this.state.jobPosition,
      workPlaceOne: this.state.workPlaceOne,
      workPlaceTwo: this.state.workPlaceTwo,
      averageSalary: this.state.averageSalary,
      studentNo: this.state.studentNo,
      degree: this.state.degree,
      department: this.state.department,
      faculty: this.state.faculty,
      school: this.state.school,
      bio: this.state.bio,
      averageSalaray: this.state.averageSalaray,
    };

    axios
      .put("/users/edit/" + this.props.user.id, newUser)
      .then((res) => console.log(res.data));

    window.location = "/dashboard";

    console.log(newUser);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        {this.state.averageSalaray}
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className="reg row">
            <div className="col-lg-6 col-sm-12">
              <div className="form-group">
                <div className="reg row">
                  <input
                    className="form-control"
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
                    className="form-control"
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
                  <label
                    className="label-profile-pic btn btn-primary"
                    style={{ width: "auto" }}
                  >
                    <input
                      className="form-control"
                      onChange={this.onChangeProfilePicture}
                      placeholder="Profile Picture"
                      name="profilePicture"
                      type="file"
                    />
                    Edit Profile Picture
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    value={this.state.jobPosition}
                    onChange={this.onChange}
                    placeholder="Job Role"
                    error={errors.jobPosition}
                    id="jobPosition"
                    type="text"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className="form-control"
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
                    value={this.state.averageSalaray}
                    onChange={this.onChange}
                    placeholder="Average Salary"
                    id="averageSalaray"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 right">
              <div className="form-group">
                <div className="reg row">
                  <input
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                  <input
                    className="form-control"
                    value={this.state.school}
                    onChange={this.onChange}
                    placeholder="School"
                    id="school"
                    type="text"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="reg row">
                  <input
                    className="form-control"
                    value={this.state.alStream}
                    onChange={this.onChange}
                    placeholder="G.C.E A/L Stream"
                    id="alStream"
                    type="text"
                  />
                </div>
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

              <div className="form-group" style={{ paddingRight: "70px" }}>
                {/* <div className="button" style={{ textAlign: "left" }}>
                  <input
                    type="submit"
                    value="Save Changes"
                    className="btn btn-primary"
                    id="join"
                  />
                </div> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-register"
                  id="join"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProfile;
