import React, { Component } from 'react';
import "./Admin.css";
import AdminSideBar from '../elements/AdminSideBar/AdminSideBar';
import Degree from './Degree/Degree';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Department from './Department/Department';
import Faculty from './Faculty/Faculty';

class Admin extends Component {
    render(){
        return(
            <Router>
                <div className="row">
                    <div className="col-md-2">
                        <AdminSideBar />
                    </div>
                    <div className="sidebar-right col-md-10">
                        <Route path="/admin" exact component = { Degree }/> 
                        <Route path="/admin/degrees" exact component = { Degree }/>
                        <Route path="/admin/departments" exact component = { Department }/>
                        <Route path="/admin/faculties" exact component = { Faculty }/>
                    </div>
                </div>
            </Router>

        )
    }

}

export default Admin;