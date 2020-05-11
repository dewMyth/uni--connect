import React, { Component } from "react";
import "./CreatePost.css";

class CreatePost extends Component {
  render() {
    return (
      <div className="container">
        <div className="row post-input">
          <div className="col-md-10">
            <textarea
              placeholder="Create a post..."
              className="post-textarea"
            ></textarea>
          </div>
          <div className="share-btn">
            <button className="btn btn-primary share">Share</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
