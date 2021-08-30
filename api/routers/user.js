const express = require("express");
const { createUser,getUserById,getUsers } = require("../controllers/user");

const router = express.Router();

router.post("/create-user", createUser);
router.get('/get-users',getUsers)
router.post('/get-user-by-id',getUserById)

module.exports = router;
