const rateLimit = require('express-rate-limit');

const addPolicyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const getPolicyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const getAllPoliciesOfCustomerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const updatePolicyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const deletePolicyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
})

module.exports = { addPolicyLimiter, getPolicyLimiter, getAllPoliciesOfCustomerLimiter, updatePolicyLimiter, deletePolicyLimiter };