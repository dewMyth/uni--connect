import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./AdminSideBar.css";

export default class AdminSideBar extends Component {
  render() {
    return (
      <div className="container">
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <img
            src="/images/logo-white.png"
            width="auto"
            height="50px"
            className="d-inline-block align-top"
            alt="sidebar-logo"
            id="sidebar-logo"
          />
        </div>
        <div
          style={{
            backgroundColor: "#8c2634",
            color: "#ffffff",
          }}
        >
          <h5 style={{ textAlign: "center", marginTop: "20px" }}>
            Admin Dashboard of Uni - Connect
          </h5>
          <ul
            className="list-group"
            style={{
              width: "100%",
              backgroundColor: "#8c2634",
              marginTop: "20px",
            }}
          >
            <li className="list-group-item">
              <Link
                to="/admin/"
                className="nav-link"
                style={{ color: "#8c2634" }}
              >
                Overall
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                to="/admin/daily"
                className="nav-link"
                style={{ color: "#8c2634" }}
              >
                Daily
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                to="/admin/weekly"
                className="nav-link"
                style={{ color: "#8c2634" }}
              >
                Departments
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                to="/admin/monthly"
                className="nav-link"
                style={{ color: "#8c2634" }}
              >
                monthly
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
