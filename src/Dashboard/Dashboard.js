import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "./Dashboard.css";
import NavBar from "../NavBar/NavBar";
import Feed from "../Feed/Feed";
import Profile from "../Profile/Profile";
import Message from "../Message/Message";
import Chat from "../elements/Chat/Chat";
import Find from "../Find/Find";
import MyPosts from "../MyPosts/MyPosts";
// import UserPosts from "../PostsByUser/PostsByUser";
import Sidebar from "../elements/Sidebar/Sidebar";
import SinglePost from "../elements/SinglePost/SinglePost";
import EditPost from "../elements/SinglePost/EditPost";
import SingleUser from "../elements/SingleUser/SingleUser";
import SingleDegree from "../elements/SingleDegree/SingleDegree";
import SingleDepartment from "../elements/SingleDepartment/SingleDepartment";
import ChatOnline from "../elements/ChatOnline/ChatOnline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostsByUser from "../PostsByUser/PostsByUser";
import axios from "axios";

class Dashboard extends Component {
  componentDidMount() {
    axios.get("/dashboard/visits").then((response) => {
      console.log(response.data);
    });
  }
  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <Router>
        <div className="container">
          <NavBar user={user} />
          <div className="row">
            <Sidebar />
            <div className="page col-md-8">
              <Switch>
                <Route path="/dashboard" exact component={Feed} />
                <Route path="/message" component={Message} />
                <Route path="/chat" component={Chat} />
                <Route
                  path="/profile/:id"
                  exact
                  render={() => <Profile user={user} />}
                />
                <Route path="/posts/:id" exact component={SinglePost} />
                <Route path="/posts/edit/:id" exact component={EditPost} />
                <Route path="/find" exact component={Find} />
                <Route path="/my-posts/:id" exact component={MyPosts} />
                <Route path="/posts/by/:id" exact component={PostsByUser} />
                <Route path="/users/:id" exact component={SingleUser} />
                <Route path="/degrees/:id" exact component={SingleDegree} />
                <Route
                  path="/departments/:id"
                  exact
                  component={SingleDepartment}
                />
              </Switch>
            </div>
            <div className="chat col-md-2">
              <ChatOnline />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
