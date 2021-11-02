const rateLimit = require('express-rate-limit');

const getCustomerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const getAllCustomersOfUserLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const getAllCustomersOfInsuranceCarrierLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const addCustomerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const updateCustomerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

const deleteCustomerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10
});

module.exports = { addCustomerLimiter, updateCustomerLimiter, deleteCustomerLimiter, getCustomerLimiter, getAllCustomersOfUserLimiter, getAllCustomersOfInsuranceCarrierLimiter };