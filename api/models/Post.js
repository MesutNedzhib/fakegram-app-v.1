const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  imageUrl: {
    type: String,
    required: [true, "Please provide a image"],
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  user_imageUrl: {
    type: String,
    required: [true, "Please provide a user image"],
  },
  user_name: {
    type: String,
    required: [true, "Please provide a user name"],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  commentCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
