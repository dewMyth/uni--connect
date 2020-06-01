import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Sidebar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div className="bio col-md-2">
        <div className="profile-pic-row">
          <img
            id="profpic"
            src={user.profilePicture}
            width="auto"
            height="100px"
            alt=""
          />
        </div>

        <b>
          {user.firstName} {user.lastName}
        </b>
        <p>{user.degree}</p>
        <p>{user.department}</p>
        <button onClick={this.onLogoutClick} className="logout btn btn-primary">
          Log out
        </button>
      </div>
    );
  }
}

Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Sidebar);
