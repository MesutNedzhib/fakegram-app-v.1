const express = require("express");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  createPost,
  likeUnlikePost,
  getUserPosts,
  getAllPosts,
  getSingleUserPosts,
} = require("../controllers/post");
const postImageUpload = require("../middlewares/libraries/imageFileUpload");
const {
  checkPostIsExist,
} = require("../middlewares/database/databaseErrorHandler");
const comment = require("./comment");

const router = express.Router();

router.get("/get-user-posts", getAccessToRoute, getUserPosts);

router.post(
  "/",
  getAccessToRoute,
  postImageUpload.single("post_image"),
  createPost
);
router.get("/", getAllPosts);
router.get("/:id", getSingleUserPosts);

router.get(
  "/:id/like-unlike",
  [getAccessToRoute, checkPostIsExist],
  likeUnlikePost
);

// api/post/41894541/comment
router.use("/:post_id/comment", checkPostIsExist, comment);

module.exports = router;
