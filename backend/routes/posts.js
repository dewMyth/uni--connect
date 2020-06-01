const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.route("/").get((req, res) => {
  Post.find()
    .populate("postedBy", "_id firstName lastName profilePicture")
    .select("")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", upload.single("postImage"), (req, res) => {
  // console.log(req.file);
  console.log(req.body.user);
  const newPost = new Post({
    postTitle: req.body.postTitle,
    postImage: req.file.path,
    postDescription: req.body.postDescription,
    postedBy: req.body.user,

    // postedBy: req.profile,
  });

  newPost
    .save()
    .then(() => res.json("Post Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
