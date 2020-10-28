import React, { Component } from "react";
// import { Box } from "admin-bro";
import axios from "axios";
import { Progress } from "reactstrap";
import "../../public/bootstrap/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";
// import { response } from "express";

class MyDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
    };
  }
  componentDidMount() {
    axios.get("/users/view").then((res) => {
      this.setState({
        firstName: res.data[0].firstName,
      });
    });
  }
  render() {
    return (
      <div className="container">
        <h1>{this.state.firstName}</h1>
        <div>
          Salary Range ( 0 - 300, 000 LKR)
          <Progress color="success" value="70" />
        </div>
      </div>
    );
  }
}

export default MyDashboard;
