const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { Auth } = require('../middlewares/auth');
router.get('/me', Auth, userController.myProfile);

module.exports = router;
