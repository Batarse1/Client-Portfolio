const express = require('express');
const router = express.Router();

const { signUpLimiter, loginLimiter ,getUserLimiter, isAuthenticatedLimiter } = require('./Limiter');
const authenticate = require('../authenticate/Authenticate');
const { signUp, login, getUser, isAuthenticated } = require('../../controllers/user/UserController');

router.get('/getUser', getUserLimiter, authenticate, getUser);
router.post('/signUp', signUpLimiter, signUp);
router.post('/logIn', loginLimiter, login);
router.get('/IsAuthenticated', isAuthenticatedLimiter, authenticate, isAuthenticated);

module.exports = router;