import React, { Component } from "react";
import axios from "axios";
import "./Post.css";

class Post extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios.get("/posts").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          posts: response.data,
        });
      }
    });
  }

  renderPosts = (posts) => (
    <div>
      {posts.map((post, index) => (
        <div className="card shadow-sm" key={index} id="post-card">
          <div className="card-body">
            <h5 className="card-title">{post.postTitle}</h5>
            <p className="card-text">{post.postDescription}</p>
            <img className="card-img-top" src={post.postImage} alt="" />
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { posts } = this.state;
    return <div className="container">{this.renderPosts(posts)}</div>;
  }
}

export default Post;
