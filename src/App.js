import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from 'react-redux';
import store from "./store";
import './App.css';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import PrivateRoute from './private-route/PrivateRoute';
import Dashboard from './Dashboard/Dashboard';
import Faculty from './Admin/Faculty/Faculty';
import Department from './Admin/Department/Department';
import Degree from './Admin/Degree/Degree';


//Check for token to keep user logged in
if(localStorage.jwtToken) {
  //Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //Decode token and get user infor and exp
  const decoded = jwt_decode(token);
  //Set user and isAuthentiated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now()/1000; //to convert to ms
  if(decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "./login"
  }
}

class App extends Component {
  render(){
    return(
      <Provider store = { store }>
        <Router>
          <Route path="/" exact component = {Home} />
          <Route path="/register" exact component = {Register} />
          <Route path="/login" exact component = {Login} />
            <Switch>
                <PrivateRoute  exact path="/dashboard" component = { Dashboard }/>
            </Switch>
           <Route path="/admin/faculties" exact component = { Faculty } />
           <Route path="/admin/departments" exact component = { Department } />
           <Route path="/admin/degrees" exact component = { Degree } />
       </Router>
        </Provider>
    )
  }
}
export default App;