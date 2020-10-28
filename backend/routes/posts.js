const express = require("express");
const router = express.Router();
const _ = require("lodash");
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

//Get all Posts
router.route("/").get((req, res) => {
  Post.find()
    .populate("postedBy", "_id firstName lastName profilePicture")
    .populate("comments.postedBy", "_id firstName lastName")
    .select(
      "_id postTitle postImage postDescription  postedBy created likes comments"
    )
    .sort({ created: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//Add a Post
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

//Find Single Post using ID
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("postedBy", "_id firstName lastName profilePicture")
    .populate("comments.postedBy", "_id firstName lastName")
    .select(
      "_id postTitle postImage postDescription  postedBy created likes comments"
    )
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Post not found" + err));
});

//Adding a Like
router.put("/like", (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.json(result);
    }
  });
});

//Adding unlike
router.put("/unlike", (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.json(result);
    }
  });
});

//Adding a comment
router.put("/comment", (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;

  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.postedBy", "_id firstName lastName profilePicture")
    .populate("postedBy", "_id firstName lastName profilePicture")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
});

//Remove a comment
router.put("/uncomment", (req, res) => {
  let comment = req.body.comment;

  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { comments: { _id: comment._id } } },
    { new: true }
  )
    .populate("comments.postedBy", "_id firstName lastName profilePicture")
    .populate("postedBy", "_id firstName lastName profilePicture")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
});

//Delete a Post
router.delete("/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Post Deleted");
    })
    .catch((err) => res.status(400).json("Error" + err));
});

//Get a Single Post using idea
router.get("/my-posts/:id", (req, res) => {
  Post.find({ postedBy: req.params.id })
    .populate("postedBy", "_id firstName lastName")
    .sort("_created")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(posts);
    });
});

//Edit a Post
router.put("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post = _.extend(post, req.body);
      post.save((err) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json(post);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// router.get("/by/:id", (req, res) => {
//   Post.find({ postedBy: req.params.id })
//     .populate("postedBy", "_id firstName lastName")
//     .sort("_created")
//     .exec((err, posts) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       }
//       res.json(posts);
//     });
// });

module.exports = router;
