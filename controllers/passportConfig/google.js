const config = require("../../config/env");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const user = require('../../models/user');


// GOOGLE CONFIGURATIONS
module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id)
	});

	passport.deserializeUser((id, done) => {
		googleUser.findById(id, (err, user) => {
			done(err, user)
		})
	});

	passport.use(new GoogleStrategy({
		clientID:config.GOOGLE_CLIENT_ID,
		clientSecret:config.GOOGLE_CLIENT_SECRET,
		callbackURL:config.GOOGLE_CALLBACK_URL,
		passReqToCallback:true
	},
	async(request, accesstoken, refreshtoken, profile, done) => {
		try {
			let existingUser = await user.findOne({ 'google.id': profile.id });

			// if user exists, return the user
			if (existingUser) {
				return done(null, existingUser)
			} else {
				//if user does not exist, create a new user
				const newUser = new user({
				method: 'google',
				google: {
					id: profile.id,
					name: profile.displayName,
					email: profile.emails[0].value
				}
			})

			await newUser.save();
			return done(null, newUser);
			}
		} catch (error) {
			return done(error, false);
		}
	}
	));
};