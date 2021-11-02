const express = require('express');
const router = express.Router();

const { signInLimiter, loginLimiter ,getUserLimiter } = require('./Limiter');
const authenticate = require('../authenticate/Authenticate');
const { signIn, login, getUser } = require('../../controllers/user/UserController');

router.get('/getUser', getUserLimiter, authenticate, getUser);
router.post('/signIn', signInLimiter, signIn);
router.post('/logIn', loginLimiter, login);

module.exports = router;