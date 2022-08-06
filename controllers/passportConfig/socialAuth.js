const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../../routes/auth.route');


// GOOGLE AUTHENTICATION
// Redirect to google signin page
exports.googleAuthenticate = passport.authenticate('google', { scope: ['email', 'profile'] }) 


// Redirect to user profile after successful login
exports.googleRedirect = passport.authenticate('google',
{session: false, successRedirect: "/api/v1/users/profile", failureRedirect: "/*"}), (req, res) => {
	try {
		jwt.sign(
			{ user: req.user },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN }, 
			(err, token) => {
				if (err) {
					return res.json({ token: null });
				}
				res.json({ token, });
				console.log(token)
			}
		);
		res.redirect("/profile");
	} catch (error) {
		throw error;
	}
}; 


// FACEBOOK AUTHENTICATION
// redirect to facebook sign in page
exports.facebookAuthenticate = passport.authenticate("facebook");

// redirect to user profile after successful login
exports.facebookRedirect =  passport.authenticate("facebook", {
	session: false,
    successRedirect: "/api/v1/users/profile",
    failureRedirect: "/*"
})