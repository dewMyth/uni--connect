import React, { Component } from "react";
import Messages from "../elements/Messages/Message";
class Chat extends Component {
  render() {
    return (
      <div className="container">
        <Messages />
      </div>
    );
  }
}

export default Chat;
