import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import TextContainer from "../TextContainer/TextContainer";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="container" style={{ height: "100vh", textAlign: "center" }}>
      <div className="containerChat shadow">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          sendMessage={sendMessage}
          setMessage={setMessage}
          message={message}
        />
      </div>
      <div>
        <TextContainer users={users} />
      </div>
    </div>
  );
};

export default Chat;
