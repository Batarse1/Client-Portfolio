const rateLimit = require('express-rate-limit');

const addInsuredLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const getAllInsuredOfPolicyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
})

const updateInsuredLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
})

const deleteInsuredLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
})

module.exports = { getAllInsuredOfPolicyLimiter, addInsuredLimiter, updateInsuredLimiter, deleteInsuredLimiter };