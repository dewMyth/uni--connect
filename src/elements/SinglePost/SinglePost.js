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
    //   created:
    comments: [],
    like: false,
    likes: 0,
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
          posterId: response.data.postedBy.id,
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

  render() {
    return (
      <div className="container">
        <div className="card shadow-sm" id="post-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-xs-6">
                <h3 className="card-title">{this.state.postTitle}</h3>
                {/* <i>
                  <p>{new Date(post.created).toDateString()}</p>
                </i> */}
              </div>
              <div className="col-md-4 col-xs-4">
                <Link
                  to={`/profile/${this.state.posterId}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontFamily: "Lato",
                    textAlign: "right",
                    lineHeight: "40px",
                  }}
                >
                  <p>{`${this.state.firstName} ${this.state.lastName}`}</p>
                </Link>
              </div>
              <div className="col-md-2 col-xs-4 col">
                <img
                  src={this.state.postImage}
                  alt=""
                  width="45px"
                  height="auto"
                  style={{
                    borderRadius: "50px",
                  }}
                />
              </div>
            </div>
            <img className="card-img-top" src={this.state.postImage} alt="" />
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
            <p>{this.state.likes} Likes</p>
            <p className="card-text">{this.state.postDescription}</p>
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
