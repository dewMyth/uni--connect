import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "./Dashboard.css"
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
    console.log(user);
        return(
            <div className="container">
                <b>Hey There, </b> {user.firstName}{user.profilePicture}
                <button onClick={ this.onLogoutClick }>Log out</button>
                <div className="navbar">
                  Navigation Bar
                </div>
                <div className="row">
                  <div className="bio col-md-2">
                    Left - Profile's Details
                  </div>
                  <div className="page col-md-8">
                    Center - Page
                  </div>
                  <div className="chat col-md-2">
                    Right - Chats Online
                  </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Dashboard);