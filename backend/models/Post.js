const mongoose = require("mongoose");

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
});

module.exports = Post = mongoose.model("posts", PostSchema);
