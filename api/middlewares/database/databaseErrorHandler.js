const Post = require("../../models/Post");
const User = require("../../models/User");
const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");

const checkUserIsExist = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("There is no such user with that id", 400));
  }

  next();
});

const checkPostIsExist = expressAsyncHandler(async (req, res, next) => {
  const post_id = req.params.id || req.params.post_id;

  const post = await Post.findById(post_id);

  if (!post) {
    return next(new CustomError("There is no such post with that id", 400));
  }

  next();
});

module.exports = {
  checkPostIsExist,
  checkUserIsExist,
};
