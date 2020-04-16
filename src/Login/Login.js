import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions.js";
import './Login.css';
import classnames from 'classnames';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            errors : {} 
        };
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated){
            this.props.history.push("/dashboard");  //Push user to dashboard when they login
        }
        if(nextProps.errors){
            this.setState({
                errors : nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({
             [e.target.id]: e.target.value 
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email : this.state.email,
            password : this.state.password
        };
        console.log(userData);

        this.props.loginUser(userData);
    }

    render(){
        const { errors } = this.state;
    

        return(

            <div className="content">
                <img src="/images/logo.png" className="logo-connect" alt="logo"/>
                <br />
                <b className="connect-welcome">Welcome Back</b>
                <br />
                <p className="connect-text">Stay Logged in, Stay Connect with your Uni - Mates</p>
                <br />
                <form noValidate onSubmit={this.onSubmit} >
                    <div className="input">
                            <input className={classnames("", { invalid : errors.email || errors.emailnotfound }, "input-username")}
                                placeholder="Email"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                            />
                    </div>
                    <span className="text-danger">
                        {errors.email}
                        {errors.emailnotfound}
                    </span>
                    <br />
                    <div className="input">
                            <input className={classnames("", { invalid : errors.password || errors.passwordincorrect }, "input-password")}
                                type="password"
                                placeholder="Password"
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                            />
                    </div>
                    <span className="text-danger">
                        {errors.password}
                        {errors.passwordincorrect}
                    </span>
                    <br />
                    <button type="submit" className="btn btn-primary">Connect</button>
                </form>

                <br />
                <br />
                <br />
                <a href="/" className="f-pw">Forgot Password?</a>
                <p>Doesn't have an account? <a href="/register" className="join-now-text">Join Now</a></p>
            </div>
            
        
        )
    }
}

Login.propTypes = {
    loginUser : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth : state.auth,
    errors : state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);