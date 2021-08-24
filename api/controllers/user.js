const expressAsyncHandler = require("express-async-handler");
const UploadPost = require("../models/UploadPostModel");
const AddComment = require("../models/AddCommentModel");
const User = require("../models/UserModel");
const { post } = require("../routers/user");

const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, imageUrl } = req.body.dataForSend;

  const isExist = await User.findOne({ email: email });

  if (isExist) {
    res.status(200).json({
      message: "success",
      data: {
        _id: isExist._id,
        name: isExist.name,
        email: isExist.email,
        imageUrl: isExist.imageUrl,
      },
    });
  } else {
    const user = new User({
      name,
      email,
      imageUrl,
      posts: [],
    });

    const createdUser = await user.save();

    res.status(200).json({
      message: "success",
      data: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        imageUrl: createdUser.imageUrl,
      },
    });
  }
});

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

const postUploadByUserId = expressAsyncHandler(async (req, res) => {
  const { _userId, _userImageUrl, _username, imageUrl, description } =
    req.body.data;

  const postField = await User.findOne({ _id: _userId });
  const postModel = new UploadPost({
    _userId,
    _userImageUrl,
    _username,
    imageUrl,
    description,
  });
  const successPostModelCreated = await postModel.save();
  if (successPostModelCreated) {
    postField.posts.push(successPostModelCreated);
    await postField.save();
    res.status(200).json({
      success: true,
      message: "Poste Created",
      data: postField,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Bad request",
    });
  }
});
const getPosts = expressAsyncHandler(async (req, res) => {
  const { _userId } = req.body.data;
  const userData = await User.findOne({ _id: _userId });
  const followingList = userData.following;
  followingList.push(_userId);
  let newBack = [];

  if (followingList) {
    for (let i of followingList) {
      const listWithPosts = await User.findById({ _id: i });
      if (listWithPosts) {
        newBack = newBack.concat(listWithPosts.posts);
      }
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
const addComment = expressAsyncHandler(async (req, res) => {
  const { _postId, _userId, _username, _userImageUrl, comment, currentUserId } =
    req.body.data;

  const handlePost = await User.findOne({ _id: _userId });
  let findAndUpdate = handlePost.posts.find((elem) => elem._id == _postId);
  findAndUpdate.comments.push({
    _userId,
    _username,
    _userImageUrl,
    comment,
  });

  await User.findByIdAndUpdate(
    { _id: _userId },
    {
      posts: handlePost.posts,
    }
  );

  // ---------------------------------------
  const userData = await User.findOne({ _id: currentUserId });
  const followingList = userData.following;

  followingList.push(currentUserId);
  let newBack = [];

  if (followingList) {
    for (let i of followingList) {
      const listWithPosts = await User.findById({ _id: i });
      if (listWithPosts) {
        newBack = newBack.concat(listWithPosts.posts);
      }
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

const setLikeToPost = expressAsyncHandler(async (req, res) => {
  const { _postId, _userId, currentUserId } = req.body.data;
  const handlePost = await User.findOne({ _id: _userId });
  let findAndUpdate = handlePost.posts.find((elem) => elem._id == _postId);

  if (!findAndUpdate.likes.includes(currentUserId)) {
    findAndUpdate.likes.push(currentUserId);
  } else {
    findAndUpdate.likes.splice(findAndUpdate.likes.indexOf(currentUserId), 1);
  }

  await User.findByIdAndUpdate(
    { _id: _userId },
    {
      posts: handlePost.posts,
    }
  );

  const userData = await User.findOne({ _id: currentUserId });
  const followingList = userData.following;

  followingList.push(currentUserId);
  let newBack = [];

  if (followingList) {
    for (let i of followingList) {
      const listWithPosts = await User.findById({ _id: i });
      if (listWithPosts) {
        newBack = newBack.concat(listWithPosts.posts);
      }
    }
  }

  newBack.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  res.status(200).json({
    success: true,
    message: "GET Likes",
    data: newBack,
  });
});

module.exports = {
  createUser,
  imageFileUpload,
  postUploadByUserId,
  getPosts,
  addComment,
  setLikeToPost,
};
