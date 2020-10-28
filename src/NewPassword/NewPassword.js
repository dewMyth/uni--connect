import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newPassword } from "../actions/authActions.js";
import "./NewPassword.css";
import classnames from "classnames";

class NewPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.token);
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
      token: this.props.match.params.token,
      password: this.state.password,
    };
    console.log(userData);

    this.props.newPassword(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="content">
        <img src="/images/logo.png" className="logo-connect" alt="logo" />
        <br />
        <b className="connect-welcome">Welcome Back</b>
        <br />
        <p className="connect-text">
          Stay Logged in, Stay Connect with your Uni - Mates
        </p>
        <br />
        <form noValidate onSubmit={this.onSubmit}>
          <br />
          <div className="input">
            <input
              className={classnames(
                "",
                { invalid: errors.password },
                "input-password"
              )}
              type="password"
              placeholder="New Password"
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
            />
          </div>
          <span className="text-danger">{errors.password}</span>
          <br />

          <button type="submit" className="btn btn-primary btn-newpw">
            Update
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

NewPassword.propTypes = {
  newPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { newPassword })(NewPassword);
