import React, { Component } from "react";
import axios from "axios";
import "./Degree.css";

class Degree extends Component {
  constructor(props) {
    super(props);

    this.onChangeDegreeTitle = this.onChangeDegreeTitle.bind(this);
    this.onChangeFaculty = this.onChangeFaculty.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDegreeDescription = this.onChangeDegreeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      degreeTitle: "",
      faculty: "",
      department: "",
      degreeDescription: "",
      faculties: [],
      departments: [],
    };
  }

  componentDidMount() {
    axios.get("/faculties").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          faculties: response.data.map((faculty) => faculty.facultyTitle),
          facultyTitle: response.data[1].facultyTitle,
        });
      }
    });

    axios.get("/departments").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          departments: response.data.map(
            (department) => department.departmentTitle
          ),
          departmentTitle: response.data[0].departmentTitle,
        });
      }
    });
  }

  onChangeDegreeTitle(e) {
    this.setState({
      degreeTitle: e.target.value,
    });
  }

  onChangeFaculty(e) {
    this.setState({
      faculty: e.target.value,
    });
  }

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value,
    });
  }

  onChangeDegreeDescription(e) {
    this.setState({
      degreeDescription: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const degree = {
      degreeTitle: this.state.degreeTitle,
      degreeDescription: this.state.degreeDescription,
    };

    console.log(degree);

    this.setState({
      degreeTitle: "",
      degreeDescription: "",
    });

    axios.post("/degrees/add", degree).then((res) => console.log(res.data));
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              required
              className="dg form-control"
              placeholder="Title"
              value={this.state.degreeTitle}
              onChange={this.onChangeDegreeTitle}
            />
            <br />

            <div>
              <textarea
                required
                className="form-control"
                placeholder="Description"
                value={this.state.degreeDescription}
                onChange={this.onChangeDegreeDescription}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Degree"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Degree;
