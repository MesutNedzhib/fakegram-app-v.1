const multer = require("multer");
const path = require("path");

// Storage, FileFilter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // let allowedMimeTypes = ["image/jpeg", "image/gif", "image/jpg", "image/png"];

  // if (!allowedMimeTypes.includes(file.mimetype)) {
  //   return cb(console.log("Please provide a valid image file", 400, false));
  // }
  // return cb(null, true);
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = { upload };
