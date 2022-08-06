const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const socialAuth = require('../controllers/passportConfig/socialAuth');


// LOCAL AUTH ROUTES
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);


// GOOGLE AUTH ROUTES
// redirect user to google sigin page
router.route("/google").get(socialAuth.googleAuthenticate);
// retrieve user data using the access token received
router.route("/google/callback").get(socialAuth.googleRedirect);
 

// FACEBOOK AUTH ROUTES
// redirect user to facebook signin page
router.route('/facebook').get(socialAuth.facebookAuthenticate);
// retrieve user data using the access token received
router.route("/facebook/callback").get(socialAuth.facebookRedirect);

module.exports = router;