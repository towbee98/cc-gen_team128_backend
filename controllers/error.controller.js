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
		return res.status(err.statusCode).json({
			message: err.message,
		});
	}
};
