const router = require("express").Router();

const Post = require("../models/Post");

router.route("/").get((req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const postTitle = req.body.postTitle;
  const postImage = req.body.postImage;
  const postDescription = req.body.postDescription;

  const newPost = new Post({
    postTitle,
    postImage,
    postDescription,
  });

  newPost
    .save()
    .then(() => res.json("Post Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
