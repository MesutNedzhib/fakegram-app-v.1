const expressAsyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const CustomError = require("../helpers/error/CustomError");
const User = require("../models/User");

const createPost = expressAsyncHandler(async (req, res, next) => {
  const { content } = req.body;

  const user = await User.findById(req.user.id);

  const post = await Post.create({
    content,
    imageUrl: req.savedPostImage,
    user: user._id,
    user_name: user.name,
    user_imageUrl: user.imageUrl,
  });

  res.status(200).json({
    success: true,
    data: post,
  });
});

const getAllPosts = expressAsyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

const getUserPosts = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const following = user.following;
  following.push(req.user.id);

  let userPosts = [];

  for (let id of following) {
    const postData = await Post.find({ user: id }).populate("comments");
    userPosts = userPosts.concat(postData);
  }

  userPosts.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  res.status(200).json({
    success: true,
    data: userPosts,
  });
});

const likeUnlikePost = expressAsyncHandler(async (req, res, next) => {
  const post_id = req.params.id;

  const post = await Post.findById(post_id);

  if (post.likes.includes(req.user.id)) {
    const index = post.likes.indexOf(req.user.id);
    post.likes.splice(index, 1);
    post.likeCount = post.likes.length;
  } else {
    post.likes.push(req.user.id);
    post.likeCount = post.likes.length;
  }

  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

const getSingleUserPosts = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const userPosts = await Post.find({ user: id });
  if (!userPosts) {
    return next(
      new CustomError("There is no such posts with that user id", 400)
    );
  }

  userPosts.sort((x, y) => {
    return new Date(y.createdAt) - new Date(x.createdAt);
  });

  res.status(200).json({
    success: true,
    count: userPosts.length,
    data: userPosts,
  });
});

module.exports = {
  createPost,
  likeUnlikePost,
  getUserPosts,
  getAllPosts,
  getSingleUserPosts,
};
