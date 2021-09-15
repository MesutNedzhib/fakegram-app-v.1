const Comment = require("../models/Comment");
const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");
const Post = require("../models/Post");

const addCommentToPost = expressAsyncHandler(async (req, res, next) => {
  const { post_id } = req.params;
  const { content } = req.body;

  const user = await User.findById(req.user.id);

  const comment = await Comment.create({
    content,
    user: user.id,
    user_name: user.name,
    user_imageUrl: user.imageUrl,
    post: post_id,
  });

  res.status(200).json({
    success: true,
    data: comment,
  });
});

const getAllCommentsByPost = expressAsyncHandler(async (req, res, next) => {
  const { post_id } = req.params;

  const post = await Post.findById(post_id).populate("comments");
  const comments = post.comments;

  return res.status(200).json({
    success: true,
    count: comments.length,
    data: comments,
  });
});

module.exports = {
  addCommentToPost,
  getAllCommentsByPost,
};
