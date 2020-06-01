import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "./Dashboard.css";
import NavBar from "../NavBar/NavBar";
import Feed from "../Feed/Feed";
import Profile from "../Profile/Profile";
import Chat from "../Chat/Chat";
import Sidebar from "../elements/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../private-route/PrivateRoute";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <Router>
        <div className="container">
          <NavBar user={user} />

          <div className="row">
            <Sidebar />
            <div className="page col-md-8">
              <Route path="/dashboard" exact component={Feed} />
              <Route path="/chat" exact component={Chat} />
              <Route
                path="/profile/:id"
                exact
                render={() => <Profile user={user} />}
              />{" "}
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
