import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "../CreatePost/CreatePost.css";

class EditPost extends Component {
  state = {
    postTitle: "",
    postImage: "",
    postDescription: "",
    user: {},
  };

  componentDidMount() {
    axios.get("/posts/" + this.props.match.params.id).then((response) => {
      this.setState({
        postTitle: response.data.postTitle,
        postImage: response.data.postImage,
        postDescription: response.data.postDescription,
      });
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

    const newPost = {
      postTitle: this.state.postTitle,
      postImage: this.state.postImage,
      postDescription: this.state.postDescription,
    };

    axios
      .put("/posts/" + this.props.match.params.id, newPost)
      .then((res) => console.log(res.data));

    window.location = "/dashboard";
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
                  value={this.state.postTitle}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Create a post..."
                  className="post-textarea"
                  rows="1"
                  id="postDescription"
                  onChange={this.onChange}
                  value={this.state.postDescription}
                ></textarea>
              </div>
            </div>
            <div className="col-md-2">
              <button type="submit" className="share-btn btn-primary share">
                Share
              </button>
            </div>
            <div>
              <img src={this.state.postImage} alt="not found" />
              <label
                className="image btn btn-primary"
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

EditPost.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(EditPost));
