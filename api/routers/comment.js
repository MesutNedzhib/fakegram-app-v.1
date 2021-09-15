const express = require("express");
const {
  addCommentToPost,
  getAllCommentsByPost,
} = require("../controllers/comment");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.post("/", getAccessToRoute, addCommentToPost);
router.get("/", getAllCommentsByPost);

module.exports = router;
