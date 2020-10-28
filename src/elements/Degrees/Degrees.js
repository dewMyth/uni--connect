import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Degrees extends Component {
  state = {
    degrees: [],
  };

  componentDidMount() {
    axios.get("/degrees/find").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        this.setState({
          degrees: response.data,
        });
      }
    });
  }

  renderDegrees = (degrees) => {
    return (
      <div className="row justify-content-center">
        {degrees.map((degree) => {
          const degreeTitle = degree.degreeTitle;

          const department = degree.department.departmentTitle;
          const faculty = degree.faculty.facultyTitle;

          return (
            <div className="card col-md-3" style={{ width: "10rem" }}>
              <div className="card-body">
                <Link to={`/degrees/${degree._id}`}>
                  <h5 className="card-title">{degreeTitle}</h5>
                </Link>
                <p className="card-text" style={{ fontSize: "10px" }}>
                  {department}
                </p>
                <p className="card-text" style={{ fontSize: "10px" }}>
                  {faculty}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { degrees } = this.state;

    return (
      <div className="container" style={{ textAlign: "left" }}>
        <b>Find Degrees</b>
        <hr />
        {this.renderDegrees(degrees)}
      </div>
    );
  }
}

export default Degrees;
