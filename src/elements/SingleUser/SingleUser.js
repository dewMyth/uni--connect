import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import FollowButton from "../FollowButton/FollowButton";
import { Progress } from "reactstrap";

class SingleUser extends Component {
  state = {
    user: {
      following: [],
      followers: [],
    },
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
    departmentId: "",
    faculty: "",
    bio: "",
    error: "",
    following: false,
  };

  checkFollow = (user) => {
    const match = user.followers.find((follower) => {
      return follower._id === this.props.auth.user.id;
    });
    return match;
  };

  clickFollowButton = (callApi) => {
    callApi(this.props.auth.user.id, this.state.user._id).then((response) => {
      console.log(response);
      this.setState({
        following: !this.state.following,
      });
    });
  };

  componentDidMount() {
    axios
      .get("/users/view/" + this.props.match.params.id)
      .then((response) => {
        let following = this.checkFollow(response.data);
        this.setState({
          user: response.data,
          degree: response.data.degree.degreeTitle,
          department: response.data.department.departmentTitle,
          departmentId: response.data.department._id,
          faculty: response.data.faculty.facultyTitle,
          profilePicture: response.data.profilePicture,
          following,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  followUser = () => {
    fetch("/users/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followId: this.props.match.params.id,
        userId: this.props.auth.user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="row">
            <div className="col-md-3">
              <img
                src={"/" + this.state.profilePicture}
                style={{ borderRadius: "0px" }}
                width="auto"
                height="200px"
                alt=""
              />
              <div className="card-title">
                {this.state.user.firstName} {this.state.user.lastName}
                <div
                  className="card-subtitle"
                  style={{ color: "grey", fontSize: "10px" }}
                >
                  {this.state.user.jobPosition} at <br />{" "}
                  {this.state.user.workPlaceOne}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <p style={{ fontSize: "20px", color: "#8c2634" }}>
                <b>Followers</b>
              </p>
              <b style={{ fontSize: "40px" }}>
                {this.state.user.followers.length}
              </b>
              <hr />
              <p style={{ fontSize: "20px", color: "#8c2634" }}>
                <b>Following</b>
              </p>
              <b style={{ fontSize: "40px" }}>
                {this.state.user.following.length}
              </b>
            </div>
            <div className="col-md-3">
              <div style={{ marginTop: "50%", lineHeight: "15px" }}>
                <b>From</b>
                <br />
                <Link to={`/departments/${this.state.user.departmentId}`}>
                  {this.state.department}
                </Link>
              </div>
            </div>
            <div className="col-md-3" style={{ marginTop: "50px" }}>
              {this.props.auth.user.id !== this.props.match.params.id && (
                <>
                  <FollowButton
                    following={this.state.following}
                    onButtonClick={this.clickFollowButton}
                  />
                  <br />
                  <br />
                  <Link to={`/posts/by/${this.props.match.params.id}`}>
                    <button
                      className="btn btn-login"
                      style={{ width: "auto", height: "auto" }}
                    >
                      Posts by {this.state.user.firstName}
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div></div>

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
                {this.state.user.firstName} {this.state.user.lastName}
              </b>
            </p>
            <div className="card-subtitle">Email</div>
            <p className="card-text">
              <b>{this.state.user.email}</b>
            </p>
            <div className="card-subtitle">Contact No</div>
            <p className="card-text">
              <b>{this.state.user.phone}</b>
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
            {/* <div className="card-subtitle">School</div>
            <p className="card-text">{this.state.degree}</p>
            <div className="card-subtitle">Department</div>
            <p className="card-text">{this.state.department}</p>
            <div className="card-subtitle">Faculty</div>
            <p className="card-text">{this.state.faculty}</p> */}
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
                value={(this.state.user.averageSalaray / 300000) * 100}
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

SingleUser.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SingleUser);
