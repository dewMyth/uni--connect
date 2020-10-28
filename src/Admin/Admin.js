import React, { Component } from "react";
import "./Admin.css";
import AdminSideBar from "./AdminSideBar/AdminSideBar";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Overall from "./Overall";
import Daily from "./Daily/Daily";
import Weekly from "./Weekly/Weekly";
import Monthly from "./Monthly/Monthly";

class Admin extends Component {
  render() {
    return (
      <Router>
        <div className="row">
          <div
            className="col-md-3"
            style={{
              backgroundColor: "#8c2634",
              height: "100vh",
              position: "fixed",
            }}
          >
            <AdminSideBar />
          </div>
          <div className="sidebar-right col-md-9">
            <Route path="/admin" exact component={Overall} />
            <Route path="/admin/daily" exact component={Daily} />
            <Route path="/admin/weekly" exact component={Weekly} />
            <Route path="/admin/monthly" exact component={Monthly} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Admin;
