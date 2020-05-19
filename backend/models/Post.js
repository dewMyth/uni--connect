const mongoose = require("mongoose");
const User = require("../models/User");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
  },
  postDescription: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("posts", PostSchema);
