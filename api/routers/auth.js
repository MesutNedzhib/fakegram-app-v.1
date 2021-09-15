const express = require("express");
const { login, logout } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);

module.exports = router;
