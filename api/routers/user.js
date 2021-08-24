const express = require("express");
const {
  createUser,
  imageFileUpload,
  postUploadByUserId,
  getPosts,
  addComment,
  setLikeToPost,
} = require("../controllers/user");
const { upload } = require("../helpers/multerImageUpload/multerImageUpload");

const router = express.Router();

router.post("/create-user", createUser);
router.post("/image-file-upload", upload.single("image"), imageFileUpload);
router.post("/post-upload-by-user-id", postUploadByUserId);
router.post("/get-posts", getPosts);
router.post("/set-comment", addComment);
router.post("/set-like", setLikeToPost);
module.exports = router;
