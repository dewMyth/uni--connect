import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./CreatePost.css";

class CreatePost extends Component {
  state = {
    postTitle: "",
    postImage: "",
    postDescription: "",
    user: {},
  };

  componentDidMount() {
    this.setState({
      user: this.props.auth.isAuthenticated.user,
    });
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeImage = (e) => {
    this.setState({
      postImage: e.target.files[0],
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const newPost = new FormData();

    newPost.set("postTitle", this.state.postTitle);
    newPost.set("postImage", this.state.postImage);
    newPost.set("postDescription", this.state.postDescription);
    // newPost.set("postedBy", user);
    newPost.set("user", user.id);
    console.log(user);

    axios
      .post("/posts/add", newPost)
      .then((res) => {
        alert("Post Added!");
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });

    // window.location.href = "/dashboard";
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          {/* <p>{user.firstName}</p> */}
          <div className="row post-input">
            <div className="col-md-10">
              <div className="form-group ">
                <input
                  placeholder="Title..."
                  className="title-input"
                  id="postTitle"
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Create a post..."
                  className="post-textarea"
                  rows="1"
                  id="postDescription"
                  onChange={this.onChange}
                  value={this.state.body}
                ></textarea>
              </div>
            </div>
            <div className="col-md-2">
              <button type="submit" className="share-btn btn-login share">
                Share
              </button>
            </div>
            <div>
              <label
                className="image btn btn-login"
                onChange={this.onChangeImage}
              >
                <input className="add-image" type="file" />
                Add Image
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CreatePost.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(CreatePost));
