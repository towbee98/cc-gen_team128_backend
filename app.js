const express = require("express");
const app = express();
const authRouter = require("./routes/auth.route");
const designRouter= require("./routes/design.route")
const globalErrorHandler = require("./controllers/error.controller");
const AppError = require("./utils/appError");

// body-parser
app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/design",designRouter);
// undefined routes
app.use("/*", (req, res, next) => {
	return next(
		new AppError("Something went wrong, this page deosn't seem to exist")
	);
});

app.use(globalErrorHandler);

module.exports = app;
