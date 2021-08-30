const express = require("express");
const {
  createUser,
  getUserById,
  getUsers,
  setFollow,
  setUnfollow,
} = require("../controllers/user");

const router = express.Router();

router.post("/create-user", createUser);
router.get("/get-users", getUsers);
router.post("/get-user-by-id", getUserById);
router.post("/set-follow", setFollow);
router.post("/set-unfollow", setUnfollow);

module.exports = router;
