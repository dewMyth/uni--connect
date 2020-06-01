import React, { Component } from "react";
import axios from "axios";

class ViewProfile extends Component {
  state = {
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
              {this.state.firstName} {this.state.lastName}
            </p>
            <div className="card-subtitle">Degree</div>
            <p className="card-text">{this.state.degree}</p>
            <div className="card-subtitle">Department</div>
            <p className="card-text">{this.state.department}</p>
            <div className="card-subtitle">Faculty</div>
            <p className="card-text">{this.state.faculty}</p>
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
            <div className="card-subtitle">School</div>
            <p className="card-text">
              {this.state.firstName} {this.state.lastName}
            </p>
            <div className="card-subtitle">Degree</div>
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
            <div className="card-subtitle">School</div>
            <p className="card-text">
              {this.state.firstName} {this.state.lastName}
            </p>
            <div className="card-subtitle">Previous Job</div>
            <p className="card-text">{this.state.workPlaceOne}</p>
            <div className="card-subtitle">Current Job</div>
            <p className="card-text">{this.state.department}</p>
            <div className="card-subtitle">Faculty</div>
            <p className="card-text">{this.state.faculty}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProfile;
