const Joi = require("joi");

function validateSignUp(user) {
	const Schema = Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		phoneNumber: Joi.string().min(11).max(11).optional(),
		email: Joi.string().email().required(),
		password: Joi.string().min(7).required(),
		role: Joi.string().valid("user", "admin").optional(),
	});

	return Schema.validate(user);
}

function validateLogin(user) {
	const Schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(7).required(),
	});

	return Schema.validate(user);
}

module.exports = {
	validateSignUp,
	validateLogin,
};