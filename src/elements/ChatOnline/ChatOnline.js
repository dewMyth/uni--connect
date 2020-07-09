import React, { Component } from "react";
import axios from "axios";
// import Messages from "../elements/Messages/Message";
class ChatOnline extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios.get("/users").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data,
        });
      }
    });
  }

  renderUsers = (users) => {
    return (
      <div>
        <div
          className="card-header mb-2"
          style={{
            backgroundColor: "#8c2634",

            fontFamily: "Campton",
            color: "#ffffff",
          }}
        >
          <b>Chats Online</b>
        </div>
        {users.map((user, index) => {
          return (
            <div
              className="card mb-2"
              key={index}
              style={{ textAlign: "left" }}
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {user.firstName} {user.lastName}{" "}
                  <span class="badge badge-success">Online</span>
                  <p style={{ color: "grey", fontSize: "11px" }}>
                    {user.jobPosition}
                    <br />
                    {user.degree}
                  </p>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { users } = this.state;
    console.log(users);
    return <div>{this.renderUsers(users)}</div>;
  }
}

export default ChatOnline;
