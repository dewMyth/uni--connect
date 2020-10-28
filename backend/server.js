const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const passport = require("passport");
const posts = require("./routes/posts");
const degrees = require("./routes/degrees");
const faculties = require("./routes/faculties");
const departments = require("./routes/departments");
const users = require("./routes/users");
const admins = require("./routes/admin");
const dashboard = require("./routes/dashboard");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./chatUsers");

const server = http.createServer(app);
const io = socketio(server);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

//making Uploads folder public
app.use("/uploads", express.static("uploads"));

// Routes

app.use("/admin", admins);

//CORS
const cors = require("cors");

app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use("/users", users);
app.use("/degrees", degrees);
app.use("/faculties", faculties);
app.use("/departments", departments);
app.use("/posts", posts);
app.use("/dashboard", dashboard);

//Real Time Chat Process with Socket

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, Welcome to the room of ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the room`,
      });
    }
  });
});

//CV
const pdf = require("html-pdf");
const cvTemplate = require("./documents/cv");

app.post("/create-pdf", (req, res) => {
  pdf.create(cvTemplate(req.body), {}).toFile("cv.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/cv.pdf`);
});

//Admin - Overall
const overallTemplate = require("./documents/overall");

app.post("/create-overall-pdf", (req, res) => {
  pdf.create(overallTemplate(req.body), {}).toFile("overall.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.get("/fetch-overall", (req, res) => {
  res.sendFile(`${__dirname}/overall_insights.pdf`);
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
// app.listen(port, () => console.log(`Server up and running on port ${port} !`));

//Start Server on Port
server.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);
