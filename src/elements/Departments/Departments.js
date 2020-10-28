import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Departments extends Component {
  state = {
    departments: [],
  };

  componentDidMount() {
    axios.get("/departments").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        this.setState({
          departments: response.data,
        });
      }
    });
  }

  renderDegrees = (departments) => {
    return (
      <div className="row justify-content-center">
        {departments.map((department) => {
          const faculty = department.faculty.facultyTitle;

          return (
            <div className="card col-md-3" style={{ width: "10rem" }}>
              <div className="card-body">
                <Link to={`/departments/${department._id}`}>
                  <h5 className="card-title">{department.departmentTitle}</h5>
                </Link>
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
    const { departments } = this.state;

    return (
      <div className="container" style={{ textAlign: "left" }}>
        <b>Find Departments</b>
        <hr />
        {this.renderDegrees(departments)}
      </div>
    );
  }
}

export default Departments;
