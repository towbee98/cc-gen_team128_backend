const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Auth = catchAsync(async (req, res, next) => {
    // check if token exists
    // console.log(req.headers);
    const token = req.headers['auth-token'];
    if (!token) return next(new AppError('Access restricted', 403));
    // if token exist, verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return next(new AppError('Invalid Token', 403));
    // check if user still exists
    const user = await User.findById(decoded.id);
    if (!user)
        return next(new AppError('User not found, please sign up'));
    req.user = user;
    next();
});

const IsAdmin = catchAsync(async (req, res, next) => {
    // check for authentication
    if (!req.user)
        return next(
            new AppError(
                'You are not authorized to access this route',
                401
            )
        );

    // check if the role is admin
    if (req.user.role !== 'admin')
        return next(
            new AppError(
                'You do not have permission to access this route',
                403
            )
        );

    next();
});

module.exports = {
    Auth,
    IsAdmin,
};
