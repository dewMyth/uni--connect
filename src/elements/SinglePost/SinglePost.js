import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { like, unlike } from "./apiPost";
import axios from "axios";
import "../Post/Post.css";
import Comment from "../Comment/Comment";

class SinglePost extends Component {
  state = {
    postTitle: "",
    postImage: "",
    postDescription: "",
    firstName: "",
    lastName: "",
    posterId: "",
    profilePicture: "",
    //   created:
    comments: [],
    like: false,
    likes: 0,
    deleted: false,
  };

  checkLike = (likes) => {
    const userId = this.props.auth.user.id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          postTitle: response.data.postTitle,
          postImage: response.data.postImage,
          postDescription: response.data.postDescription,
          firstName: response.data.postedBy.firstName,
          lastName: response.data.postedBy.lastName,
          profilePicture: response.data.postedBy.profilePicture,
          posterId: response.data.postedBy._id,
          likes: response.data.likes.length,
          like: this.checkLike(response.data.likes),
          comments: response.data.comments,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateComments = (comments) => {
    this.setState({ comments });
  };

  likeToggle = () => {
    let callApi = this.state.like ? unlike : like;

    const userId = this.props.auth.user.id;
    const postId = this.props.match.params.id;

    callApi(userId, postId).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        });
      }
    });
  };

  deletePost = () => {
    axios
      .delete("/posts/" + this.props.match.params.id)
      .then((res) => console.log(res.data))
      .then(
        this.setState({
          deleted: true,
        })
      );

    window.location = "/dashboard";
  };

  render() {
    return (
      <div className="container">
        <div className="card shadow-sm" id="post-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-xs-6">
                <h3 className="card-title" style={{ color: "#8c2634" }}>
                  <b>{this.state.postTitle}</b>
                </h3>
                {/* <i>
                  <p>{new Date(post.created).toDateString()}</p>
                </i> */}
              </div>
              <div className="col-md-4 col-xs-4">
                <Link
                  to={`/users/${this.state.posterId}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontFamily: "Lato",
                    textAlign: "right",
                    lineHeight: "40px",
                  }}
                >
                  <p>
                    <i>{`${this.state.firstName} ${this.state.lastName}`}</i>{" "}
                  </p>
                </Link>
              </div>
              <div className="col-md-2 col-xs-4">
                <img
                  src={"/" + this.state.profilePicture}
                  width="45px"
                  height="auto"
                  style={{
                    borderRadius: "50px",
                    marginBottom: "20px",
                  }}
                  alt=""
                />
              </div>
            </div>
            <img
              className="card-img-top"
              src={"/" + this.state.postImage}
              alt=""
            />
            <hr />
            <div className="row">
              <div className="col-md-6">
                {" "}
                {this.state.like ? (
                  <h5 onClick={this.likeToggle}>
                    <i
                      className="fa fa-thumbs-up text-success"
                      aria-hidden="true"
                      style={{ padding: "10px" }}
                    />
                    <span className="badge badge-success">Liked</span>
                  </h5>
                ) : (
                  <h5 onClick={this.likeToggle}>
                    <i
                      className="fa fa-thumbs-up text-danger"
                      aria-hidden="true"
                      style={{ padding: "10px" }}
                    />
                    <span className="badge badge-danger">Like</span>
                  </h5>
                )}
                <b>{this.state.likes} Likes</b>
                <hr />
                <p className="card-text">{this.state.postDescription}</p>
              </div>
              <div className="col-md-6" style={{ textAlign: "right" }}>
                {" "}
                {this.props.auth.user.id === this.state.posterId && (
                  <>
                    <Link to={`/posts/edit/${this.props.match.params.id}`}>
                      Edit
                    </Link>
                    {"    "}
                    <Link onClick={this.deletePost}>Delete</Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <Comment
            postId={this.props.match.params.id}
            comments={this.state.comments}
            updateComments={this.updateComments}
          />
        </div>
      </div>
    );
  }
}

SinglePost.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(SinglePost);
