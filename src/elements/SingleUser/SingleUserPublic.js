import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

class SingleUserPublic extends Component {
  state = {
    user: "",
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
    error: "",
    following: false,
  };

  componentDidMount() {
    axios
      .get("/users/view/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          user: response.data,
          degree: response.data.degree.degreeTitle,
          department: response.data.department.departmentTitle,
          faculty: response.data.faculty.facultyTitle,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <div>
          <img
            id="profpic"
            src={"/" + this.state.user.profilePicture}
            width="auto"
            height="100px"
            alt=""
          />
        </div>

        <div>
          {this.props.auth.user.id !== this.props.match.params.id && (
            <>
              <Link to={`/posts/by/${this.props.match.params.id}`}>
                <button className="btn btn-primary">
                  Posts by {this.state.user.firstName}
                </button>
              </Link>
            </>
          )}
        </div>

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
            {/* <div>
              Salary Range ( 0 - 300, 000 LKR)
              <Progress
                color="success"
                value={Math.floor(Math.random() * 100) + 1}
              />
            </div> */}
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

SingleUserPublic.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SingleUserPublic);
