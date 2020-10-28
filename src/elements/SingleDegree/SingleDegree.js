import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import ReactToPrint from "react-to-print";

// import { Link } from "react-router-dom";

class SingleDegree extends Component {
  state = {
    title: "",
    department: "",
    faculty: "",
    description: "",
    users: [],
    jobs: [],
    count: [],
    chartData: {},
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/degrees/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          title: response.data.degreeTitle,
          department: response.data.department.departmentTitle,
          faculty: response.data.faculty.facultyTitle,
          description: response.data.degreeDescription,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/degrees/students/" + this.props.match.params.id)
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

    let tempJob = [];
    let tempCount = [];

    axios
      .get("/users/jobWithDegree/" + this.props.match.params.id)
      .then((res) => {
        for (const dataObj of res.data) {
          tempJob.push(dataObj._id);
          tempCount.push(dataObj.Count);
        }
        this.setState({
          jobs: tempJob,
          count: tempCount,
          chartData: {
            labels: tempJob,
            datasets: [
              {
                label: "Job Positions",
                data: tempCount,
                backgroundColor: "#8c2634",
              },
            ],
          },
        });
      });
    console.log(tempJob, tempCount);
  }

  renderUsers = (users) => {
    return (
      <div className="row justify-content-left">
        {users.map((user) => {
          const firstName = user.firstName;
          const lastName = user.lastName;
          const jobPosition = user.jobPosition;
          const workPlaceOne = user.workPlaceOne;
          const profilePicture = user.profilePicture;

          return (
            <div className="container">
              <div className="media">
                <img
                  className="mr-3"
                  src={"/" + profilePicture}
                  alt="Not Found"
                  style={{ width: "64px", borderRadius: "50%" }}
                />
                <div className="media-body">
                  <h5 className="mt-0" style={{ marginBottom: "-3px" }}>
                    {firstName} {lastName}
                  </h5>
                  <p style={{ marginBottom: "-3px" }}>{jobPosition}</p>
                  <p>{workPlaceOne}</p>
                </div>
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
            <div className="card-subtitle">{this.state.department}</div>
            <hr />
            <div className="card-subtitle">{this.state.faculty}</div>
            <hr />
            <p className="card-text">{this.state.description}</p>
          </div>
        </div>

        <hr />
        <h4 style={{ color: "#8c2634", textAlign: "left" }}>
          {this.state.users.length} graduates are from {this.state.title}
        </h4>
        <br />
        <div className="row">
          <div className="col-md-6" style={{ textAlign: "left" }}>
            {this.renderUsers(users)}
          </div>
          <div className="col-md-6">
            <div className="chart">
              <Bar
                data={this.state.chartData}
                options={{
                  maintainAspectRatio: true,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                          userCallback: function (label, index, labels) {
                            if (Math.floor(label) === label) {
                              return label;
                            }
                          },
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SingleDegree.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SingleDegree);
