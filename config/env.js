const dotenv = require("dotenv");
dotenv.config({});
module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
	GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL,
};
