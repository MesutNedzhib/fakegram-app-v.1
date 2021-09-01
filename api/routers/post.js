const express = require("express");
const {
  imageFileUpload,
  uploadPost,
  getPosts,
  setCommentToPost,
  setLikeToPost,
  getPostsByUserId,
} = require("../controllers/post");
const { upload } = require("../helpers/multerImageUpload/multerImageUpload");
const router = express.Router();

router.post("/image-file-upload", upload.single("image"), imageFileUpload);
router.post("/upload-post", uploadPost);
router.post("/get-posts", getPosts);
router.get("/get-posts-by-user-id/:id", getPostsByUserId);
router.post("/set-comment", setCommentToPost);
router.post("/set-like", setLikeToPost);

module.exports = router;
