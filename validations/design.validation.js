const Joi = require("joi");

function validateDesignBody(design) {
	const Schema = Joi.object().keys({
		title: Joi.string().required(),
		slug: Joi.string().optional(),
		category: Joi.string().required(),
		downloadLink: Joi.string().required(),
		comments: Joi.object().optional(),
		likes: Joi.number().optional(),
	});

	return Schema.validate(design);
}

module.exports = {
    validateDesignBody
}