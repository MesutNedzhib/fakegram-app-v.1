const mongoose = require("mongoose");

const postModelScheme = new mongoose.Schema(
  {
    _userId: { type: String, required: true },
    _userImageUrl: { type: String, required: true },
    _username: { type: String, required: true },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postModelScheme);

module.exports = Post;
