const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const authController = require('../controllers/auth.controller');
router.post('/sign_in',
            body('username').isEmail(),
            // password must be at least 6 chars long
            body('password').isLength({ min: 6 }),
            authController.signIn)

module.exports = router;