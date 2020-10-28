import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";

class MyPosts extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    axios
      .get("/posts/my-posts/" + this.props.match.params.id)
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data);
          this.setState({
            posts: response.data,
          });
        }
      });
  }

  renderPosts = (posts) => {
    return (
      <div>
        {posts.map((post, index) => {
          // const posterId = post.postedBy ? post.postedBy._id : "No Id";
          //   const posterFirstName = post.postedBy ? post.postedBy.firstName : "";
          //   const posterLastName = post.postedBy ? post.postedBy.lastName : "";
          const posterProfPic = post.postedBy
            ? post.postedBy.profilePicture
            : "";

          return (
            <div className="card shadow-sm" key={index} id="post-card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-xs-6">
                    <Link to={`/posts/${post._id}`}>
                      <h5 className="card-title">{post.postTitle}</h5>
                    </Link>
                    <i>
                      <ReactTimeAgo date={post.created} locale="en" />
                    </i>
                  </div>
                  {/* <div className="col-md-4 col-xs-4">
                    <Link
                      to={`/profile/${posterId}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontFamily: "Lato",
                        textAlign: "right",
                        lineHeight: "40px",
                      }}
                    >
                      <p>{`${posterFirstName} ${posterLastName}`}</p>
                    </Link>
                  </div> */}
                  <div className="col-md-2 col-xs-4 col">
                    {" "}
                    <img
                      src={posterProfPic}
                      alt=""
                      width="45px"
                      height="auto"
                      style={{
                        borderRadius: "50px",
                      }}
                    />
                  </div>
                </div>
                <p className="card-text">{post.postDescription}</p>
                <img className="card-img-top" src={post.postImage} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return <div className="container">{this.renderPosts(posts)}</div>;
  }
}

export default MyPosts;
