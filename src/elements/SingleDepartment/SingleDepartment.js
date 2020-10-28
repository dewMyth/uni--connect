import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class SingleDepartment extends Component {
  state = {
    title: "",
    // degrees: [],
    faculty: "",
    description: "",
    users: [],
  };

  componentDidMount() {
    axios
      .get("/departments/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          title: response.data.departmentTitle,
          // degrees: response.data.degree.degreeTitle,
          faculty: response.data.faculty.facultyTitle,
          description: response.data.degreeDescription,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/departments/students/" + this.props.match.params.id)
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data);
          this.setState({
            users: response.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderUsers = (users) => {
    return (
      <div className="row justify-content-center">
        {users.map((user) => {
          const firstName = user.firstName;
          const lastName = user.lastName;
          const jobPosition = user.jobPosition;
          const profilePicture = user.profilePicture;

          return (
            <div className="card col-md-3" style={{ width: "10rem" }}>
              <img
                className="card-img-top"
                src={"/" + profilePicture}
                alt="Not found"
              />
              <div className="card-body">
                <Link to={`/users/${user._id}`}>
                  <h5 className="card-title">
                    {firstName} {lastName}
                  </h5>
                </Link>
                <p className="card-text" style={{ fontSize: "10px" }}>
                  {jobPosition}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <div className="card shadow-sm" id="post-card">
          <div className="card-body">
            <div className="card-title">
              <b>{this.state.title}</b>
            </div>
            <hr />
            {/* <div className="card-subtitle">
              <ul className="list-group">
                {this.state.degrees.map((degree) => {
                  return <li className="list-group-item">{degree}</li>;
                })}
              </ul>
            </div> */}
            <hr />
            <div className="card-subtitle">{this.state.faculty}</div>
            <hr />
            <p className="card-text">{this.state.description}</p>
          </div>
        </div>
        <hr />
        {this.renderUsers(users)}
      </div>
    );
  }
}

SingleDepartment.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SingleDepartment);
