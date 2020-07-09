const express = require("express");
const _ = require("lodash");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/prof_pics");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User");

// @route POST users/register
// @desc Register user
// @access Public
router.post("/register", upload.single("profilePicture"), (req, res) => {
  // console.log(req.file);
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePicture: req.file.path,
        email: req.body.email,
        jobPosition: req.body.jobPosition,
        workPlaceOne: req.body.workPlaceOne,
        studentNo: req.body.studentNo,
        degree: req.body.degree,
        department: req.body.department,
        faculty: req.body.faculty,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          profilePicture: user.profilePicture,
          firstName: user.firstName,
          lastName: user.lastName,
          degree: user.degree,
          department: user.department,
          faculty: user.faculty,
          studentNo: user.studentNo,
          jobPosition: user.jobPosition,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("User not found"));
});

router.put("/:id", (req, res) => {
  User.findById(req.params.id).then((user) => {
    user = _.extend(user, req.body);
    user.save((err) => {
      if (err) {
        return res.status(400).json({
          error: "Not Authorized",
        });
      }
      res.json({ user });
    });
  });
});

router.route("/").get((req, res) => {
  User.find()
    .select("")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
