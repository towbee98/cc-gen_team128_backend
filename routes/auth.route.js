const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { googleAuthenticate, googleRedirect } = require('../controllers/googleAuth');


router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

// redirect user to google sigin page
router.route("/google").get(googleAuthenticate);
// retrieve user data using the access token received
router.route("/google/callback").get(googleRedirect);
//profile route after successful signin
 
module.exports = router;