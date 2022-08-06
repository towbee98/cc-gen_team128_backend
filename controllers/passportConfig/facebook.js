const FacebookStrategy = require('passport-facebook');
const user = require('../../models/user');
require('dotenv').config();


// FACEBOOK CONFIGURATIONS
module.exports = (passport) => {
	passport.serializeUser(function(user, done) {
		done(null, user);
	  });
	  
	  passport.deserializeUser(function(obj, done) {
		done(null, obj);
	  });
	  
	  passport.use(
		new FacebookStrategy(
		  {
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: process.env.FACEBOOK_CALLBACK_URL,
			profileFields: ["email", "name"]
		  },
		  function(accessToken, refreshToken, profile, done) {
			try {
				const { email, first_name, last_name } = profile._json;
				const userData = {
				email,
				firstName: first_name,
				lastName: last_name
				};
				new user(userData).save();
				done(null, profile);
			} catch (error) {
				return done(error, false)
			}
		  }
		)
	  );
};