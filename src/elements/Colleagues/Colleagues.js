import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Colleagues extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios.get("/users/view").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        this.setState({
          users: response.data,
        });
      }
    });
  }

  renderUsers = (users) => {
    return (
      <div className="row justify-content-center">
        {users.map((user) => {
          const firstName = user.firstName;
          const lastName = user.lastName;
          const department = user.degree.department.departmentTitle;
          const profilePicture = user.profilePicture;

          return (
            <div className="card col-md-3" style={{ width: "10rem" }}>
              <img className="card-img-top" src={profilePicture} alt="No " />
              <div className="card-body">
                <Link to={`/users/${user._id}`}>
                  <h5 className="card-title">
                    {firstName} {lastName}
                  </h5>
                </Link>
                <p className="card-text" style={{ fontSize: "10px" }}>
                  {department}
                </p>
                <a href="/" className="btn btn-danger">
                  Follow
                </a>
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
      <div className="container" style={{ textAlign: "left" }}>
        <b>Find Colleagues</b>
        <hr />
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Colleagues;
