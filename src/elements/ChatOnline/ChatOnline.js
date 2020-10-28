import React, { Component } from "react";
import axios from "axios";
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
                  <span className="badge badge-success">Online</span>
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

// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import TextContainer from "../TextContainer/TextContainer";

// let socket;

// const Chat = ({ location }) => {
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
//   const [users, setUsers] = useState("");
//   // const [message, setMessage] = useState("");
//   // const [messages, setMessages] = useState([]);
//   const ENDPOINT = "localhost:5000";

//   useEffect(() => {
//     socket = io(ENDPOINT);

//     setName(name);
//     setRoom(room);

//     socket.emit("join", { name, room }, () => {});

//     return () => {
//       socket.emit("disconnect");
//       socket.off();
//     };
//   }, [ENDPOINT]);

//   useEffect(() => {
//     socket.on("roomData", ({ users }) => {
//       setUsers(users);
//     });
//   }, []);

//   // console.log(message, messages);

//   return (
//     <div className="container" style={{ height: "100vh", textAlign: "center" }}>
//       <div>
//         <TextContainer users={users} />
//       </div>
//     </div>
//   );
// };

// export default Chat;
