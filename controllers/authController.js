const User = require('../models/user');
const bcrypt = require('bcryptjs');

// REGISTER USER
exports.addUser = async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
            if (err) {
                res.status(400).json({
                    error: err
                })
            }
        
        let user = await new User({
            email: req.body.email,
            password: hashedPass
        })

        await User.create(user, (err, data)=>{
            if (err) {
                res.status(400).json({
                    message: "Email already exists"
                })
            } else if (data) {
                return res.status(201).json({
                    message: 'Registration Successful'
                })    
            }
        });

        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    };
};