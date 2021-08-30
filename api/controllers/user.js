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
  const users = await User.find({});

  const backUsers = [];

  if (users) {
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * users.length);
      if (backUsers.includes(users[randomIndex])) {
      } else {
        backUsers.push(users[randomIndex]);
      }
    }
  }

  res.status(200).json({
    message: "Get Random Users - Success",
    data: backUsers,
  });
});

module.exports = {
  createUser,
  getUserById,
  getUsers,
};
