const express = require("express");
const { createUser,getUserById } = require("../controllers/user");

const router = express.Router();

router.post("/create-user", createUser);
router.post('/get-user-by-id',getUserById)

module.exports = router;
