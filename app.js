const express = require("express");
const app = express();
const authRouter = require("./routes/auth.route");
const adminRouter = require("./routes/admin.route")
const designRouter= require("./routes/design.route")
const userRouter = require("./routes/user.route");
const globalErrorHandler = require("./controllers/error.controller");
const AppError = require("./utils/appError");
const passport = require('passport');
require('./controllers/passportConfig')(passport);
const session = require("express-session");


// body-parser
app.use(express.json());

// session setup 
app.use(passport.initialize());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.GOOGLE_CLIENT_SECRET
}))
app.use(passport.session())


// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/designs",designRouter);
app.use('/api/v1/users', userRouter);
// undefined routes
app.use("/*", (req, res, next) => {
	return next(
		new AppError("Something went wrong, this page deosn't seem to exist")
	);
});

app.use(globalErrorHandler);

module.exports = app;
