const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../routes/auth.route');

// Redirect to google signin page
exports.googleAuthenticate = passport.authenticate('google', { scope: ['email', 'profile'] }) 


// Redirect to user profile after successful login
exports.googleRedirect = passport.authenticate('google',
{session: false, successRedirect: '/profile', failureRedirect: '/*'}, (req, res)=>{
	jwt.sign(
		{ existingUser: req.existingUser },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRES_IN }, 
		(err, token) => {
			if (err) {
				return res.json({ token: null });
			}
			res.json({ token, });
		}
	);
	res.redirect("/profile")
}); 