const express = require("express");
const user = require("./user");
const post = require("./post");

const router = express.Router();

router.use("/user", user);
router.use("/post", post);
module.exports = router;
