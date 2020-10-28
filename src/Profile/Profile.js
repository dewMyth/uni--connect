import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditProfile from "./EditProfile/EditProfile";
import ViewProfile from "./ViewProfile/ViewProfile";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Profile extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <Router>
        <div>
          {/* <Link to={`/edit/${this.props.user.id}`}>Edit Profile</Link> */}
          <Route
            path="/profile/:id"
            exact
            render={() => <ViewProfile user={user} />}
          />
          <Route
            path="/edit/:id"
            exact
            render={() => <EditProfile user={user} />}
          />
        </div>
      </Router>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Profile);
