import React, { Component } from "react";
import CreatePost from "../elements/CreatePost/CreatePost";
import PostList from "../elements/PostList/PostList";

class Feed extends Component {
  render() {
    return (
      <div>
        <CreatePost />
        <PostList />
      </div>
    );
  }
}

export default Feed;
