import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ResetPassword from "./ResetPassword/ResetPassword";
import NewPassword from "./NewPassword/NewPassword";
import PrivateRoute from "./private-route/PrivateRoute";
import Dashboard from "./Dashboard/Dashboard";
import SingleUserPublic from "./elements/SingleUser/SingleUserPublic";
import PostByUser from "./PostsByUser/PostsByUser";
import SingleDegree from "./elements/SingleDegree/SingleDegree";
import SinglePost from "./elements/SinglePost/SinglePost";

import Admin from "./Admin/Admin";
import JavascriptTimeAgo from "javascript-time-ago";
import ReactGa from "react-ga";

import en from "javascript-time-ago/locale/en";

import Daily from "./Admin/Daily/Daily";
import Weekly from "./Admin/Weekly/Weekly";
import Monthly from "./Admin/Monthly/Monthly";

JavascriptTimeAgo.addLocale(en);

//Check for token to keep user logged in
if (localStorage.jwtToken) {
  //Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //Decode token and get user infor and exp
  const decoded = jwt_decode(token);
  //Set user and isAuthentiated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000; //to convert to ms
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  componentDidMount() {
    ReactGa.initialize("UA-174976679-1");
    ReactGa.pageview("/");
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/reset" exact component={ResetPassword} />
          <Route path="/reset/:token" exact component={NewPassword} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Route path="/users/:id" exact component={SingleUserPublic} />
          <Route path="/degrees/:id" exact component={SingleDegree} />
          <Route path="/posts/by/:id" exact component={PostByUser} />
          <Route path="/posts/:id" exact component={SinglePost} />
          <Route path="/admin/" exact component={Admin} />
          <Route path="/admin/monthly" exact component={Monthly} />
          <Route path="/admin/weekly" exact component={Weekly} />
          <Route path="/admin/daily" exact component={Daily} />
        </Router>
      </Provider>
    );
  }
}
export default App;
