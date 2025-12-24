const express = require("express");
const router = express.Router();

const {
  registerUser,
  signinUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/signin", signinUser);

module.exports = router;
