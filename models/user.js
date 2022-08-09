const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	savedDesigns: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "design",
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
});

// google schema
const googleUserSchema = new mongoose.Schema({
	google: 
	{
		id: {
			type: String
		},
		name: {
			type: String
		},
		email: {
			type: String,
		},
	},
});


// facebook schema
const facebookUserSchema = new mongoose.Schema({
	facebook: 
	{
		email: {
			type: String
		},
		firstName: {
			type: String
		},
		lastName: {
			type: String
		}
	}
});

const User = mongoose.model("User", userSchema);
const googleUser = mongoose.model("googleUser", googleUserSchema);
 const facebookUser = mongoose.model("facebookUser", facebookUserSchema)

module.exports = {
	User,
	googleUser,
	facebookUser
}