// const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const googleUser = require('../models/user');
require('dotenv').config();


module.exports = (passport) => {
	passport.use(new GoogleStrategy({
		clientID:process.env.GOOGLE_CLIENT_ID,
		clientSecret:process.env.GOOGLE_CLIENT_SECRET,
		callbackURL:process.env.GOOGLE_CALLBACK_URL,
		passReqToCallback:true
	}, 
	async(request, accesstoken, refreshtoken, profile, done) => {
		try {
			let existingUser = await googleUser.findOne({ 'google.id': profile.id });

			// if user exists, return the user
			if (existingUser) {
				return done(null, existingUser)
			} else {
				//if user does not exist, create a new user
				const newUser = new googleUser({
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
	))
};