const express = require('express');
const router = express.Router();

const authenticate = require('../authenticate/Authenticate');

const { addPolicyLimiter, getAllPoliciesOfCustomerLimiter, updatePolicyLimiter, deletePolicyLimiter} = require('./Limiter');
const { addPolicy, getAllPoliciesOfCustomer, updatePolicy, deletePolicy } = require('../../controllers/policy/PolicyController');

router.get('/getAllPoliciesOfCustomer', getAllPoliciesOfCustomerLimiter, authenticate, getAllPoliciesOfCustomer);
router.post('/addPolicy', addPolicyLimiter, authenticate, addPolicy);
router.put('/updatePolicy', updatePolicyLimiter, authenticate, updatePolicy);
router.delete('/deletePolicy', deletePolicyLimiter, authenticate, deletePolicy);

module.exports = router;