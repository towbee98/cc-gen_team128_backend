const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../routes/auth.route');

// Redirect to google signin page
exports.googleAuthenticate = passport.authenticate('google', { scope: ['email', 'profile'] }) 


// Redirect to user profile after successful login
exports.googleRedirect = passport.authenticate('google',
{successRedirect: '/api/v1/users/profile', failureRedirect: '/*'}), (req, res) => {
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
	res.redirect("localhost:3000/api/v1/users/profile");
}; 