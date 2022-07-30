const config = require("./config/env");
const mongoose = require("mongoose");
const app = require("./app");

// Connect to the database
const ConnectDB = async (cb) => {
	try {
		await mongoose.connect(`${config.MONGO_URI}`);
		console.log("Database connected succesfully");
		cb();
	} catch (error) {
		console.log(error);
	}
};

ConnectDB(() => {
	app.listen(config.PORT, () => {
		console.log(`Server is now active on port ${config.PORT}`);
	});
});
