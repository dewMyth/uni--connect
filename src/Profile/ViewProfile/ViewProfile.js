import React, { Component } from "react";
import { Progress } from "reactstrap";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

import axios from "axios";

class ViewProfile extends Component {
  state = {
    id: "",
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
    followers: [],
    following: [],
  };

  componentDidMount() {
    //if logged in user navigates to Register page should redirect them to dashboard
    axios.get("/users/view/" + this.props.user.id).then((response) => {
      this.setState({
        id: response.data._id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        // dateOfBirth: response.data.dateOfBirth,
        profilePicture: response.data.profilePicture,
        profilePictureCV: "/" + response.data.profilePicture,
        email: response.data.email,
        phone: response.data.phone,
        jobPosition: response.data.jobPosition,
        workPlaceOne: response.data.workPlaceOne,
        workPlaceTwo: response.data.workPlaceTwo,
        studentNo: response.data.studentNo,
        degree: response.data.degree.degreeTitle,
        faculty: response.data.faculty.facultyTitle,
        department: response.data.department.departmentTitle,
        departmentId: response.data.department._id,
        bio: response.data.bio,
        password: response.data.password,
        password2: response.data.password2,
        followers: response.data.followers,
        following: response.data.following,
        averageSalaray: parseInt(response.data.averageSalaray),
      });
    });
  }

  createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "myCV.pdf");
      });
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="row">
            <div className="col-md-3">
              <p>{this.state.salary}</p>
              <img
                id="profpic"
                src={"/" + this.state.profilePicture}
                style={{ borderRadius: "0px" }}
                width="auto"
                height="200px"
                alt=""
              />
              <div className="card-title">
                {this.state.firstName} {this.state.lastName}
                <div
                  className="card-subtitle"
                  style={{ color: "grey", fontSize: "10px" }}
                >
                  {this.state.jobPosition} at <br /> {this.state.workPlaceOne}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <p style={{ fontSize: "20px", color: "#8c2634" }}>
                <b>Followers</b>
              </p>
              <b style={{ fontSize: "40px" }}>{this.state.followers.length}</b>
              <hr />
              <p style={{ fontSize: "20px", color: "#8c2634" }}>
                <b>Following</b>
              </p>
              <b style={{ fontSize: "40px" }}>{this.state.following.length}</b>
            </div>
            <div className="col-md-3">
              <div style={{ marginTop: "50%", lineHeight: "15px" }}>
                <b>From</b>
                <br />
                <Link to={`/departments/${this.state.departmentId}`}>
                  {this.state.department}
                </Link>
              </div>
            </div>
            <div className="col-md-3" style={{ marginTop: "50px" }}>
              <button
                className="btn btn-login"
                onClick={this.createAndDownloadPdf}
                style={{ width: "auto", height: "auto" }}
              >
                Get My CV
              </button>
              <br />

              <br />
              <Link
                className="btn btn-login"
                style={{ width: "auto", height: "auto" }}
                to={`/edit/${this.props.user.id}`}
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* <div>
          {this.props.auth.user.id === this.state.id && (
            <>
              <button className="btn btn-primary">Get My CV</button>
            </>
          )}
        </div> */}

        {/* Personal Information  */}
        <div className="card shadow-sm" id="post-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-xs-6">
                <h5 className="card-title">Personal Information</h5>
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
            {/* <div className="card-subtitle">Date of Birth</div>
            <p className="card-text">
              <b>{this.state.dateOfBirth}</b>
            </p> */}
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
              Salary Range ( 0 - 300, 000 LKR)
              <Progress
                color="success"
                value={(this.state.averageSalaray / 300000) * 100}
              />
            </div>
            <br /> <br />
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
