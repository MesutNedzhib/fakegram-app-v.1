const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelper");

const login = expressAsyncHandler(async (req, res, next) => {
  const { email, name, imageUrl } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    // Create a new user if it does not exist
    const user = await User.create({
      email,
      name,
      imageUrl,
    });
    sendJwtToClient(user, res);
  } else {
    // Else continue login
    sendJwtToClient(user, res);
  }
});

const logout = expressAsyncHandler(async (req, res, next) => {
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

module.exports = {
  login,
  logout,
};
