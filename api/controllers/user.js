const expressAsyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

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

const getUserById = expressAsyncHandler(async (req, res) => {
  const { _userId } = req.body.data;
  const user = await User.findById({ _id: _userId });
  if (user) {
    res.status(200).json({
      message: "Get User By Id - Success",
      data: user,
    });
  } else {
    res.status(400).json({
      message: "Get User By Id - Fail",
    });
  }
});

const getUsers = expressAsyncHandler(async (req, res) => {
  const { _userId } = req.body.data;

  const users = await User.find({});

  const withoutCurrentIdArray = users.filter((x) => x._id != _userId);

  const backUsers = [];

  if (users) {
    for (let i = 0; i < withoutCurrentIdArray.length; i++) {
      const randomIndex = Math.floor(
        Math.random() * withoutCurrentIdArray.length
      );
      if (backUsers.includes(withoutCurrentIdArray[randomIndex])) {
      } else {
        backUsers.push(withoutCurrentIdArray[randomIndex]);
      }
    }
  }

  res.status(200).json({
    message: "Get Random Users - Success",
    data: backUsers,
  });
});

const setFollow = expressAsyncHandler(async (req, res) => {
  const { _userId, _currentUserId } = req.body.data;
  const handleFollowing = await User.findOne({ _id: _userId });

  if (!handleFollowing.followers.includes(_currentUserId)) {
    handleFollowing.followers.push(_currentUserId);
  } else {
    handleFollowing.followers.splice(
      handleFollowing.followers.indexOf(_currentUserId),
      1
    );
  }

  await handleFollowing.save();

  res.status(200).json({
    message: "Set Following - Success",
    data: handleFollowing,
  });
});

const setUnfollow = expressAsyncHandler(async (req, res) => {
  const { _userId, _currentUserId } = req.body.data;
  const handleFollowing = await User.findOne({ _id: _userId });

  if (!handleFollowing.following.includes(_currentUserId)) {
    handleFollowing.following.push(_currentUserId);
  } else {
    handleFollowing.following.splice(
      handleFollowing.following.indexOf(_currentUserId),
      1
    );
  }

  await handleFollowing.save();

  res.status(200).json({
    message: "Set Unfollow - Success",
    data: handleFollowing,
  });
});

module.exports = {
  createUser,
  getUserById,
  getUsers,
  setFollow,
  setUnfollow,
};
