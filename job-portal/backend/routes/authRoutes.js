const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const e = require('cors');


router.post('/login', authController.login); // Route for login
router.post('/signup', authController.signup); // Route for signup


router.post('/forgotpassword', authController.forgotpassword);




module.exports = router;
