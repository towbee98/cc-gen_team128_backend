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
	phoneNumber:{
		type:String,
		required:true
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
	savedDesigns:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'design'
    }
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

const User = mongoose.model("User", userSchema);
const googleUser = mongoose.model("googleUser", googleUserSchema);

module.exports = User;
module.exports = googleUser;
