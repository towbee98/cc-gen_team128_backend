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
	phone:{
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

const User = mongoose.model("User", userSchema);

module.exports = User;
