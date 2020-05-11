import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "./Dashboard.css";
import NavBar from "../NavBar/NavBar";
import Feed from "../Feed/Feed";
import Profile from "../Profile/Profile";
import Message from "../Message/Message";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <Router>
        <div className="container">
          <NavBar user={user} />

          <div className="row">
            <div className="bio col-md-2">
              <div className="profile-pic-row">
                <img
                  id="profpic"
                  src={user.profilePicture}
                  width="auto"
                  height="100px"
                  alt="No pic"
                />
              </div>

              <b>
                {user.firstName} {user.lastName}
              </b>
              <p>{user.degree}</p>
              <p>{user.department}</p>
              <button
                onClick={this.onLogoutClick}
                className="logout btn btn-primary"
              >
                Log out
              </button>
            </div>
            <div className="page col-md-8">
              <Route path="/dashboard" exact component={Feed} />
              <Route path="/message" exact component={Message} />
              <Route path="/:id" render={() => <Profile user={user} />} />
            </div>
            <div className="chat col-md-2">Right - Chats Online</div>
          </div>
        </div>
      </Router>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
