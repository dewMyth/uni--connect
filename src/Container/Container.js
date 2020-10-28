import React, { Component } from "react";
import Feed from "../Feed/Feed";
import Profile from "../Profile/Profile";
import Chat from "../Chat/Chat";
import Find from "../Find/Find";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Container extends Component {
  render() {
    return (
      <div>
        <Route path="/dashboard" exact component={Feed} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/profile/:id" exact render={() => <Profile />} />
        <Route path="/find" exact component={Find} />
      </div>
    );
  }
}

export default Container;
