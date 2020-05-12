import React, { Component } from "react";
import Post from "../Post/Post";
import "./PostList.css";

class PostList extends Component {
  render() {
    return (
      <div className="container">
        <Post />
      </div>
    );
  }
}

export default PostList;
