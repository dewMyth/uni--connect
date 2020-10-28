//FOR CHAT COMPONENTS USED REACT HOOKS to LEARNING PURPOSE

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./JoinChat.css";

class JoinChat extends Component {
  state = {
    name: "",
    room: "",
  };
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");
  componentDidMount() {
    this.setState({
      name: this.props.auth.user.firstName,
    });
  }

  onChangeRoom = (e) => {
    this.setState({
      room: e.target.value,
    });
  };

  render() {
    return (
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <p>
            Enter your Department Code to enter the Chat Room..Ex : Department
            of Industrial Management= "IM"
          </p>
          <h1 className="heading">Join</h1>
          {/* <div>
            <input
              placeholder="Name"
              className="joinInput"
              type="text"
              value={this.state.name}
            />
          </div> */}
          <div>
            <input
              placeholder="Room"
              className="joinInput mt-20"
              type="text"
              onChange={this.onChangeRoom}
            />
          </div>
          <Link
            onClick={(e) =>
              !this.state.name || !this.state.room ? e.preventDefault() : null
            }
            to={`/chat?name=${this.state.name}&room=${this.state.room}`}
          >
            <button className="button mt-20" type="submit">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

JoinChat.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(JoinChat);
