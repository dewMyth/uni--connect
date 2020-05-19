import React, { Component } from "react";

class ViewProfile extends Component {
  render() {
    return <div>{this.props.user.firstName} Profile</div>;
  }
}

export default ViewProfile;
