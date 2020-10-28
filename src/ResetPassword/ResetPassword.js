import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../actions/authActions.js";
import "./ResetPassword.css";
// import classnames from "classnames";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); //Push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
    };
    // console.log(userData);
    this.props.resetPassword(userData);
  };

  render() {
    return (
      <div className="content">
        <img src="/images/logo.png" className="logo-connect" alt="logo" />
        <br />
        <b className="connect-welcome">Reset Password</b>
        <br />
        <p className="connect-text">
          Stay Logged in, Stay Connect with your Uni - Mates
        </p>
        <br />
        <form noValidate onSubmit={this.onSubmit}>
          <div className="input">
            <input
              className="input-username"
              placeholder="Email"
              onChange={this.onChange}
              value={this.state.email}
              id="email"
              type="email"
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary btn-reset">
            Send an email to reset Password
          </button>
        </form>

        <br />
        <br />
        <br />
        <a href="/" className="f-pw">
          Forgot Password?
        </a>
        <p>
          Doesn't have an account?{" "}
          <a href="/register" className="join-now-text">
            Join Now
          </a>
        </p>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
