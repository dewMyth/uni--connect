import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import axios from "axios";

class Sidebar extends Component {
  state = {
    firstName: "",
    lastName: "",
    jobPosition: "",
    degree: "",
    department: "",
    faculty: "",
  };

  componentDidMount() {
    console.log(this.props.auth.user.id);
    axios
      .get("/users/view/" + this.props.auth.user.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          jobPosition: response.data.jobPosition,
          degree: response.data.degree.degreeTitle,
          department: response.data.department.departmentTitle,
          faculty: response.data.faculty.facultyTitle,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.state.degree);
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div className="bio col-md-2">
        <div className="profile-pic-row">
          <img
            id="profpic"
            src={user.profilePicture}
            width="auto"
            height="100px"
            alt=""
          />
        </div>
        <b>
          {this.state.firstName} {this.state.lastName}{" "}
        </b>
        <p style={{ fontSize: "10px" }}>
          <h6 style={{ color: "grey" }}>{this.state.jobPosition}</h6>
          <div style={{ fontSize: "9px", color: "grey" }}>
            {this.state.degree}
            <br />
            {this.state.department}
            <br />
            {this.state.faculty}
          </div>
        </p>
        <div>
          <Link style={{ color: "grey" }} to="/find">
            Find Colleagues
          </Link>
          <br />
          <Link
            style={{ color: "grey" }}
            to={`/my-posts/${this.props.auth.user.id}`}
          >
            My Posts
          </Link>
          <br />
          <Link
            style={{ color: "grey" }}
            to={`/my-connections/${this.props.auth.user.id}`}
          >
            My Connection
          </Link>
        </div>

        <hr />
        <br />
        <button
          onClick={this.onLogoutClick}
          className="logout btn btn-login btn-sm"
          style={{ width: "50%" }}
        >
          Log out
        </button>
      </div>
    );
  }
}

Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Sidebar);
