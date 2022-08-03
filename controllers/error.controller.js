const AppError = require("../utils/appError");

// global error handler
module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";
	if (process.env.NODE_ENV === "development") {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			error: err,
		});
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err, message: err.message };

		if (error.name === "JsonWebTokenError") {
			error = new AppError("Invalid Token, Please login again", 401);
		}

		if (error.name === "TokenExpiredError") {
			error = new AppError("Your token has expired, Please login again", 401);
		}

		if (error.code === 11000) {
			let value = error.message.match(/(["'])(\\?.)*?\1/)[0];
			error = new AppError(
				`Duplicate field value: ${value}, Please use another value`
			, 400);
		}

		return res.status(error.statusCode).json({
			status: error.status,
			message: error.message,
		});
	}
};
