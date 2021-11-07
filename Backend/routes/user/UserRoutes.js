const express = require('express');
const router = express.Router();

const { signUpLimiter, loginLimiter ,getUserLimiter } = require('./Limiter');
const authenticate = require('../authenticate/Authenticate');
const { signUp, login, getUser } = require('../../controllers/user/UserController');

router.get('/getUser', getUserLimiter, authenticate, getUser);
router.post('/signUp', signUpLimiter, signUp);
router.post('/logIn', loginLimiter, login);

module.exports = router;