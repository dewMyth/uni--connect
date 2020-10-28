import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";

class Overall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalUsers: 0,
      totalPosts: 0,
      totalLikes: 0,
      totalComments: 0,
      userViews: 0,
      publicViews: 0,
      newUsers: [],
      newPosts: [],
      newPostsComments: [],
      degrees: [],
      departments: [],
      faculties: [],
      userCount: [],
      userCountFac: [],
      chartDataDegree: {},
      chartDataDep: {},
      chartDataFac: {},
    };
  }
  componentDidMount() {
    axios.get("/dashboard/get-user-visits").then((response) => {
      this.setState({
        userViews: response.data,
      });
    });

    axios.get("/dashboard/get-public-visits").then((response) => {
      this.setState({
        publicViews: response.data,
      });
    });

    //Get Total Users
    axios.get("/dashboard/total-users").then((response) => {
      this.setState({
        totalUsers: response.data,
      });
    });

    //Get New Users
    axios.get("/dashboard/new-users").then((response) => {
      console.log(response.data);
      this.setState({
        newUsers: response.data,
      });
    });

    //Get Total Posts
    axios.get("/dashboard/total-posts").then((response) => {
      this.setState({
        totalPosts: response.data,
      });
    });

    //Get Total Likes
    axios.get("/dashboard/total-posts-likes").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          totalLikes: response.data[0].total_likes,
        });
      }
    });

    //Get Total Comments
    axios.get("/dashboard/total-posts-comments").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          totalComments: response.data[0].total_comments,
        });
      }
    });

    const tempNewPosts = [];

    //Get New Posts
    axios.get("/dashboard/new-posts").then((response) => {
      //   console.log(response.data);
      this.setState({
        newPosts: response.data,
      });
    });

    //Get New Posts Comments
    axios.get("/dashboard/new-posts-comments").then((response) => {
      console.log(response.data);
      if (response.data.length > 0) {
        this.setState({
          newPostsComments: response.data,
        });
      }
    });

    let tempDepartments = [];
    let tempUserCount = [];

    let tempUser2Count = [];
    let tempDegrees = [];

    //Get Degree with User Count
    axios.get("/dashboard/userWithDegree").then((res) => {
      for (const dataObj of res.data) {
        tempDegrees.push(dataObj._id);
        tempUser2Count.push(dataObj.count);
      }
      this.setState({
        degrees: tempDegrees,
        user2Count: tempUser2Count,
        chartDataDegree: {
          labels: tempDegrees,
          datasets: [
            {
              label: "Degrees",
              data: tempUser2Count,
              backgroundColor: "#8c2634",
            },
          ],
        },
      });
    });

    //Get Department with User Count
    axios.get("/dashboard/userWithDepartment").then((res) => {
      for (const dataObj of res.data) {
        tempDepartments.push(dataObj._id);
        tempUserCount.push(dataObj.count);
      }
      this.setState({
        departments: tempDepartments,
        userCount: tempUserCount,
        chartDataDep: {
          labels: tempDepartments,
          datasets: [
            {
              label: "Departments",
              data: tempUserCount,
              backgroundColor: "#8c2634",
            },
          ],
        },
      });
    });

    let tempFaculty = [];
    let tempUserCountFac = [];

    axios.get("/dashboard/userWithFaculty").then((res) => {
      for (const dataObj of res.data) {
        tempFaculty.push(dataObj._id);
        tempUserCountFac.push(dataObj.count);
      }
      this.setState({
        faculties: tempFaculty,
        userCountFac: tempUserCountFac,
        chartDataFac: {
          labels: tempFaculty,
          datasets: [
            {
              label: "Faculties",
              data: tempUserCountFac,
              backgroundColor: [
                "#EC6B56",
                "#FFC154",
                "#47C39C",
                "#F13C59",
                "#F2BC5E",
                "#BE61CA",
              ],
            },
          ],
        },
      });
    });
  }

  renderNewUsers = (newUsers) => {
    return (
      <div className="row">
        {newUsers.map((newUser) => {
          const firstName = newUser.firstName;
          const lastName = newUser.lastName;
          const profPic = newUser.profilePicture;
          const degree = newUser.degree.degreeTitle;
          const department = newUser.department.departmentTitle;
          const jobPosition = newUser.jobPosition;

          return (
            <div className="container">
              <div className="media">
                <img
                  className="mr-3"
                  src={"/" + profPic}
                  alt="Not Found"
                  style={{ width: "64px", borderRadius: "50%" }}
                />
                <div className="media-body">
                  <h5 className="mt-0" style={{ marginBottom: "-3px" }}>
                    {firstName} {lastName}
                  </h5>
                  <p style={{ marginBottom: "-3px" }}>{jobPosition}</p>
                  <p style={{ marginBottom: "-3px" }}>{degree}</p>
                  <p>{department}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { newUsers } = this.state;
    return (
      <div className="container" style={{ marginLeft: "370px" }}>
        <h3>Overall Insights</h3>
        <hr />
        <div className="row" style={{ textAlign: "center" }}>
          <div className="col-md-6">
            <div
              className="toal-users shadow-lg"
              style={{
                backgroundColor: "#1f77b4",
                color: "white",
                fontSize: "30px",
                padding: "15px",
              }}
            >
              Total Users <br /> <b>{this.state.totalUsers}</b>
            </div>
            <br />
            <div style={{ textAlign: "left" }}>
              New Users <hr />
              {this.renderNewUsers(newUsers)}
            </div>
            <br />

            <div className="chart" style={{ textAlign: "center" }}>
              Engaged Users according to Degrees <hr />
              <Bar
                data={this.state.chartDataDegree}
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
            <div className="chart" style={{ textAlign: "center" }}>
              Engaged Users according to Departments <hr />
              <Bar
                data={this.state.chartDataDep}
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
            <br />
            <div className="chart" style={{ textAlign: "center" }}>
              Engaged Users according to Faculties <hr />
              <Pie
                data={this.state.chartDataFac}
                options={{
                  maintainAspectRatio: true,
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="container">
              <div
                className="toal-users shadow-lg"
                style={{
                  backgroundColor: "#2ca02c",
                  color: "white",
                  fontSize: "30px",
                  padding: "15px",
                }}
              >
                Total Visitor Views <br /> <b>{this.state.publicViews}</b>
              </div>
              <br />
              <div
                className="toal-users shadow-lg"
                style={{
                  backgroundColor: "#2ca02c",
                  color: "white",
                  fontSize: "30px",
                  padding: "15px",
                }}
              >
                Total User Visits
                <br /> <b>{this.state.userViews}</b>
              </div>
              <br />
              <div
                className="toal-users shadow-lg"
                style={{
                  backgroundColor: "#2ca02c",
                  color: "white",
                  fontSize: "30px",
                  padding: "15px",
                }}
              >
                Total Posts <br /> <b>{this.state.totalPosts}</b>
              </div>
              <br />
              <div
                className="toal-users shadow-lg"
                style={{
                  backgroundColor: "#8c564b",
                  color: "white",
                  fontSize: "30px",
                  padding: "15px",
                }}
              >
                Total Post Comments
                <br /> <b>{this.state.totalComments}</b>
              </div>
              <br />
              <div
                className="toal-users shadow-lg"
                style={{
                  backgroundColor: "#9467bd",
                  color: "white",
                  fontSize: "30px",
                  padding: "15px",
                }}
              >
                Total Post Likes
                <br /> <b>{this.state.totalLikes}</b>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overall;
