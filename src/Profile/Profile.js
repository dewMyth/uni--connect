import React, { Component } from "react";
// import axios from 'axios'

class Profile extends Component {
  render() {
    return <div>Profile Page of {this.props.user.firstName}</div>;
  }
}

export default Profile;
