import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AdminSideBar.css';

export default class AdminSideBar extends Component {

  render(){
      return(

        <div>
        <a className="navbar-brand mt-" href="/">
          <img src="/images/logo.png" width="auto" height="50px" className="d-inline-block align-top"  alt="sidebar-logo" id="sidebar-logo" />
        </a>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Dashboard</li>
            <li className="list-group-item">
                <Link to="/admin/degrees"  className="nav-link"  style={{color: "#8c2634"}}>Degrees</Link>
            </li>
            <li className="list-group-item">
                <Link to="/admin/departments"  className="nav-link"  style={{color: "#8c2634"}}>Departments</Link>
            </li>
            <li className="list-group-item">
                <Link to="/admin/faculties"  className="nav-link"  style={{color: "#8c2634"}}>Faculties</Link>
            </li>
            
            <li className="list-group-item">Users</li>
        </ul>
        </div>

      )
  }
}