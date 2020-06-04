import React, { Component } from "react";
import { Progress } from "reactstrap";

import axios from "axios";

class ViewProfile extends Component {
  state = {
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
    bio: "",
    password: "",
    password2: "",
  };

  componentDidMount() {
    //if logged in user navigates to Register page should redirect them to dashboard
    axios.get("/users/" + this.props.user.id).then((response) => {
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
        password: response.data.password,
        password2: response.data.password2,
      });
    });
  }
  render() {
    return (
      <div className="container">
        <div>
          <img
            id="profpic"
            src={this.state.profilePicture}
            width="auto"
            height="100px"
            alt=""
          />
        </div>

        {/* Personal Information  */}
        <div className="card shadow-sm" id="post-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-xs-6">
                <h5 className="card-title">Perosnal Information</h5>
              </div>
            </div>
            <div className="card-subtitle">Name</div>
            <p className="card-text">
              <b>
                {this.state.firstName} {this.state.lastName}
              </b>
            </p>
            <div className="card-subtitle">Email</div>
            <p className="card-text">
              <b>{this.state.email}</b>
            </p>
            <div className="card-subtitle">Contact No</div>
            <p className="card-text">
              <b>{this.state.phone}</b>
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="card shadow-sm" id="post-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-xs-6">
                <h5 className="card-title">Education</h5>
              </div>
            </div>
            <div className="card-subtitle">University</div>
            <p className="card-text">
              Degree : <b>{this.state.degree}</b>
            </p>
            <p className="card-text">
              Department : <b>{this.state.department}</b>
            </p>
            <p className="card-text">
              Faculty : <b>{this.state.faculty}</b>
            </p>
            <div className="card-subtitle">School</div>
            <p className="card-text">{this.state.degree}</p>
            <div className="card-subtitle">Department</div>
            <p className="card-text">{this.state.department}</p>
            <div className="card-subtitle">Faculty</div>
            <p className="card-text">{this.state.faculty}</p>
          </div>
        </div>
        {/* Work */}
        <div className="card shadow-sm" id="post-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-xs-6">
                <h5 className="card-title">Work</h5>
              </div>
            </div>
            <div className="card-subtitle">Current Occupation</div>
            <p className="card-text" style={{ fontSize: "15px" }}>
              {this.state.jobPosition} at {this.state.workPlaceOne}
            </p>
            <div>
              <Progress color="success" value={75} />
            </div>
            <div className="card-subtitle">Previous Job</div>
            <p className="card-text">{this.state.workPlaceTwo}</p>
            <div className="card-subtitle">Current Job</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProfile;
