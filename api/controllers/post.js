const expressAsyncHandler = require("express-async-handler");
const Post = require("../models/PostModel");

const imageFileUpload = expressAsyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "success upload",
  // });
  // let fileArray = [];
  // req.files.forEach((el) => {
  //   fileArray.push(el.originalname);
  // });

  res.status(200).json({
    success: true,
    message: "Success Upload",
    // data: fileArray,
  });
});

const uploadPost = expressAsyncHandler(async (req, res) => {
  const { _userId, _userImageUrl, _username, imageUrl, description } =
    req.body.data;

  const createPost = await Post.create({
    _userId,
    _userImageUrl,
    _username,
    imageUrl,
    description,
  });

  if (createPost) {
    res.status(200).json({
      success: true,
      message: "Successfully Created Post",
      data: createPost,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Unsuccessfully Created Post",
    });
  }
});

const getPosts = expressAsyncHandler(async (req, res) => {
  const { following } = req.body.data;

  let newBack = [];
  for (let id of following) {
    const postData = await Post.find({ _userId: id });
    if (postData) {
      newBack = newBack.concat(postData);
    }
  }

  newBack.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  res.status(200).json({
    success: true,
    message: "GET POSTS",
    data: newBack,
  });
});
const setCommentToPost = expressAsyncHandler(async (req, res) => {
  const { _postId, _userId, _username, _userImageUrl, comment, createdAt } =
    req.body.data;

  const handlePost = await Post.findByIdAndUpdate(
    { _id: _postId },
    {
      $push: {
        comments: {
          _userId,
          _username,
          _userImageUrl,
          comment,
          createdAt,
        },
      },
    }
  );

  await handlePost.save();

  res.status(200).json({
    success: true,
    message: "GET Comments",
    data: handlePost,
  });
});

const setLikeToPost = expressAsyncHandler(async (req, res) => {
  const { _postId, currentUserId } = req.body.data;
  const handlePost = await Post.findOne({ _id: _postId });

  if (!handlePost.likes.includes(currentUserId)) {
    handlePost.likes.push(currentUserId);
  } else {
    handlePost.likes.splice(handlePost.likes.indexOf(currentUserId), 1);
  }

  await handlePost.save();

  res.status(200).json({
    success: true,
    message: "GET Likes",
    data: handlePost,
  });
});

module.exports = {
  imageFileUpload,
  uploadPost,
  getPosts,
  setCommentToPost,
  setLikeToPost,
};
