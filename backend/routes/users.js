const express = require("express");
const _ = require("lodash");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const requireLogin = require("../middleware/requireLogin");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

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
const { result } = require("lodash");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//Mail API - 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

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
            .then((newUser) => {
              transporter.sendMail({
                to: newUser.email,
                from: "no-reply@uni-connect.kln.ac.lk",
                subject: "Welcome to Uni - Connect",
                html: `<h1>Hello, ${newUser.firstName}...Welcome to Uni - Connect</h1>`,
              });
              res.json(newUser);
            })
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

//reset password
router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res
            .status(422)
            .json({ error: "No User exist with that email" });
        }
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user
          .save()
          .then((result) => {
            transporter.sendMail({
              to: result.email,
              from: "akalankadewmith@gmail.com",
              subject: "Reset Your Password",
              html: `
          <h1>Hello, ${user.firstName}...Click the below <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h1>
          <p>If you did not click the reset password just ignore this email</p>
          `,
            });
            res.json({ message: "Check Your email" });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try Again, session expired" });
      }
      bcrypt.hash(newPassword, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((savedUser) => {
          res.json({ message: "Password Updated" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//View User by ID
router.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .populate("following", "_id firstName lastName")
    .populate("followers", "_id firstName lastName")
    .populate("degree", "")
    .populate("department", "")
    .populate("faculty", "")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("User not found"));
});

//Edit User
router.put("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user = _.extend(user, req.body);
      user.save((err) => {
        if (err) {
          return res.status(400).json({
            error: "Not Authorized",
          });
        }
        res.json({ user });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//View All Users
router.route("/view").get((req, res) => {
  User.find()
    .select("")
    .limit(4)
    .populate({
      path: "degree",
      model: "degrees",
      populate: {
        path: "department",
        model: "departments",
        populate: {
          path: "faculty",
          model: "faculties",
        },
      },
    })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

// {IMPORTANT}

router.get("/degreeWithUser", (req, res) => {
  User.aggregate([
    { $unwind: "$degree" },
    {
      $lookup: {
        from: "degrees",
        localField: "degree",
        foreignField: "_id",
        as: "degree",
      },
    },
    { $group: { _id: "$degree.degreeTitle", Count: { $sum: 1 } } },
  ]).then((result) => {
    res.json(result);
  });
});

// router.get("/:id", (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => res.json(user))
//     .catch((err) => res.status(400).json("User not found"));
// });

//Get Number of Jobs along with degree
router.get("/jobWithDegree/:id", (req, res) => {
  User.aggregate([
    { $match: { degree: ObjectId(req.params.id) } },
    { $group: { _id: "$jobPosition", Count: { $sum: 1 } } },
  ]).then((result) => {
    res.json(result);
  });
});

// router.get("/", (req, res) => {
//   // const degree = "B.Sc in Marketing Management";
//   User.aggregate([
//     { $unwind: "$degree" },
//     {
//       $lookup: {
//         from: "faculties",
//         localField: "faculty",
//         foreignField: "_id",
//         as: "faculty",
//       },
//     },
//     { $group: { _id: "$faculty.facultyTitle", Count: { $sum: 1 } } },
//   ]).then((result) => {
//     res.json(result);
//   });
// });

// router.get("/", (req, res) => {
//   User.distinct("jobPosition").then((result) => {
//     res.json({ result });
//   });
// });

//Search User
router.post("/search-users", (req, res) => {
  let userPattern = new RegExp(req.body.query);
  User.find({ firstName: { $regex: userPattern } })
    .limit(3)
    .populate({
      path: "degree",
      model: "degrees",
    })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Follow a user
router.put("/follow", (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.body.userId },
    },
    { new: true },
    (err) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.body.userId,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

//Unfollow a User
router.put("/unfollow", (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.body.userId },
    },
    { new: true },
    (err) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.body.userId,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

// router.get("/test", (req, res) => {
//   User.find({}, { firstName: 1, _id: 0 })
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => res.status(400).json("Error:" + err));
// });

module.exports = router;
