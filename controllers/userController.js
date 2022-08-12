const User = require('../models/user');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const myProfile = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return next(new AppError('User does not exist', 404));
    res.status(200).json({
        status: 'success',
        message: 'Profile fetched successfully',
        user,
    });
});

module.exports = { myProfile };
