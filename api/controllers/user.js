const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const collect = require("collect.js");

const getSingleUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("posts");

  res.status(200).json({
    success: true,
    data: user,
  });
});

const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
});

const setFollow = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  const mainUser = await User.findById(req.user.id);

  if (user.followers.includes(req.user.id)) {
    return next(new CustomError("You already follow this user", 400));
  }

  user.followers.push(req.user.id);
  mainUser.following.push(id);

  await user.save();
  await mainUser.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

const setUnfollow = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  const mainUser = await User.findById(req.user.id);

  if (!user.followers.includes(req.user.id)) {
    return next(
      new CustomError("You can not unfollow operation for this user", 400)
    );
  }

  const index = user.followers.indexOf(req.user.id);
  user.followers.splice(index, 1);

  const mainIndex = mainUser.following.indexOf(id);
  mainUser.following.splice(mainIndex, 1);

  await user.save();
  await mainUser.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

const getRandomSuggestedUsers = expressAsyncHandler(async (req, res, next) => {
  let users = await User.find().select("name imageUrl followers");

  users = users.filter((x) => x._id != req.user.id);

  let backUsers = [];
  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      const randomIndex = Math.floor(Math.random() * users.length);
      if (!backUsers.includes(randomIndex)) {
        backUsers.push(users[randomIndex]);
      }
    }
  }

  res.status(200).json({
    success: true,
    data: backUsers,
  });
});

module.exports = {
  getSingleUser,
  getAllUsers,
  setFollow,
  setUnfollow,
  getRandomSuggestedUsers,
};
