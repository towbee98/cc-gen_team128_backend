const router= require('express').Router()
const controller = require('../controllers/authController')

// register route
router.post('/', controller.addUser)

module.exports= router