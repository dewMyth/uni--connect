import React, { Component } from "react";
import { follow, unfollow } from "../SingleUser/apiUser";

class FollowButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };
  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    return (
      <div className="d-inline-block">
        {!this.props.following ? (
          <button
            onClick={this.followClick}
            className="btn btn-login"
            style={{ width: "auto", height: "auto" }}
          >
            Follow
          </button>
        ) : (
          <button
            onClick={this.unfollowClick}
            className="btn btn-login"
            style={{
              width: "auto",
              height: "auto",
              backgroundColor: "white",
              color: "red",
            }}
          >
            Unfollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowButton;
