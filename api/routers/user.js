const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  setFollow,
  setUnfollow,
  getRandomSuggestedUsers,
} = require("../controllers/user");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  checkUserIsExist,
} = require("../middlewares/database/databaseErrorHandler");

const router = express.Router();

router.get(
  "/random-suggested-users",
  getAccessToRoute,
  getRandomSuggestedUsers
);
router.get("/", getAllUsers);
router.get("/:id", checkUserIsExist, getSingleUser);
router.get("/:id/follow", [getAccessToRoute, checkUserIsExist], setFollow);
router.get("/:id/unfollow", [getAccessToRoute, checkUserIsExist], setUnfollow);

module.exports = router;
