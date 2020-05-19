import React, { Component } from "react";

class EditProfile extends Component {
  render() {
    return (
      <div>
        <p>{this.props.user.firstName}</p>
      </div>
    );
  }
}

export default EditProfile;
