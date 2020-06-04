const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const posts = require("./routes/posts");
const degrees = require("./routes/degrees");
const faculties = require("./routes/faculties");
const departments = require("./routes/departments");
const users = require("./routes/users");
const admins = require("./routes/admin");

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

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
