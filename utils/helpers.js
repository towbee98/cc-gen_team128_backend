const bcrypt = require("bcryptjs");

const hashedPassword = async (password, salt = 12) => {
	const hashPassword = await bcrypt.hash(password, salt);
	return hashPassword;
};

const comparePassword = async (bodyPassword, dbPassword) => {
	return await bcrypt.compare(bodyPassword, dbPassword);
};

module.exports = {
	hashedPassword,
	comparePassword,
};
