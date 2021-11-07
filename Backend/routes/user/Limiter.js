const rateLimit = require('express-rate-limit');

const signUpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 5
});

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10
});

const getUserLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

module.exports = {signUpLimiter, loginLimiter, getUserLimiter};