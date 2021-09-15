const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");
// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    // File - Mimetype - image/png
    const extension = file.mimetype.split("/")[1];
    req.savedPostImage =
      "image_" +
      req.user.id +
      "_" +
      Math.floor(Math.random() * 1000 * 60) +
      "." +
      extension;
    cb(null, req.savedPostImage);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new CustomError("Please provide a valid image file", 400), false);
  }
  return cb(null, true);
};

const postImageUpload = multer({ storage, fileFilter });
module.exports = postImageUpload;
