const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
    hashedPassword,
    comparePassword,
} = require('../utils/helpers');
const {
    validateSignUp,
    validateLogin,
} = require('../validations/user.validation');

exports.signup = catchAsync(async (req, res, next) => {
    // validate user body request
    const { error } = validateSignUp(req.body);
    if (error) return next(new AppError(error.message, 400));
    // check if user exists
    const existingUser = await User.findOne({
        email: req.body.email,
    });
    if (existingUser) {
        return next(
            new AppError(
                'User already exist, please use the login route.',
                400
            )
        );
    }

    // hashPassword
    const hashPassword = await hashedPassword(req.body.password);

    // create a new user
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        phoneNumber: req.body.phoneNumber,
    });

    newUser.password = undefined;

    return res.status(201).json({
        status: 'success',
        message: 'Registration successful',
        user: newUser,
    });
});

exports.login = catchAsync(async (req, res, next) => {
    // validate login body request
    const { error } = validateLogin(req.body);
    if (error) return next(new AppError(error.message, 400));

    // check if user exist
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser)
        return next(
            new AppError(
                "Email doesn't exist, Please use the sign up route",
                401
            )
        );

    // check if bodypassword === hashedPassword in DB
    await comparePassword(password, existingUser.password);

    if (!(await comparePassword(password, existingUser.password)))
        return next(new AppError('Invalid email or password', 401));

    // if password is correct, generate a token and send to client
    const token = jwt.sign(
        { id: existingUser.id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    existingUser.password = undefined;

    return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        user: existingUser,
        token,
    });
});

exports.adminSignup = catchAsync(async (req, res, next) => {
    // validate user body request
    const { error } = validateSignUp(req.body);

    if (error) return next(new AppError(error.message, 400));

    // check if user exists
    const existingUser = await User.findOne({
        email: req.body.email,
    });
    if (existingUser) {
        return next(new AppError('Admin already exist', 400));
    }

    // hashPassword
    const hashPassword = await hashedPassword(req.body.password);

    // create a new user
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
    });

    newUser.password = undefined;

    return res.status(201).json({
        status: 'success',
        message: 'Registration successful',
        user: newUser,
    });
});

exports.adminLogin = catchAsync(async (req, res, next) => {
    // validate login body request
    const { error } = validateLogin(req.body);
    if (error) return next(new AppError(error.message, 400));

    // check if user exist
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email, role: 'admin' });
    if (!existingUser)
        return next(new AppError('Admin not found', 401));

    // check if bodypassword === hashedPassword in DB
    await comparePassword(password, existingUser.password);

    if (!(await comparePassword(password, existingUser.password)))
        return next(new AppError('Invalid email or password', 401));

    // if password is correct, generate a token and send to client
    const token = jwt.sign(
        { id: existingUser.id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    existingUser.password = undefined;

    return res.status(200).json({
        status: 'success',
        user: existingUser,
        token,
    });
});
