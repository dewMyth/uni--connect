import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div className="container">
          <a className="navbar-brand mt-" href="index.html">
            <img
              src="/images/logo.png"
              width="auto"
              height="50px"
              className="d-inline-block align-top"
              alt="logo"
            />
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto" id="items">
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="nav-link"
                  style={{ color: "#8c2634" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/message"
                  className="nav-link"
                  style={{ color: "#8c2634" }}
                >
                  Messages
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/profile/${this.props.user.id}`}
                  className="nav-link"
                  style={{ color: "#8c2634" }}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
