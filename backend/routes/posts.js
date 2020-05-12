const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
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
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", upload.single("postImage"), (req, res) => {
  console.log(req.file);
  const newPost = new Post({
    postTitle: req.body.postTitle,
    postImage: req.file.path,
    postDescription: req.body.postDescription,
  });

  newPost
    .save()
    .then(() => res.json("Post Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
