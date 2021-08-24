const mongoose = require("mongoose");

const addCommentModelScheme = new mongoose.Schema(
  {
    _userId: { type: String, required: true },
    _userImageUrl: { type: String, required: true },
    _username: { type: String, required: true },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const AddComment = mongoose.model("AddComment", addCommentModelScheme);

module.exports = AddComment;
