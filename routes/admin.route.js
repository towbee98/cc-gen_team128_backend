const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.route("/signup").post(authController.adminSignup);
router.route("/login").post(authController.adminLogin);

module.exports = router;
