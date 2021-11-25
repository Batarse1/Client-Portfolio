const express = require('express');
const router = express.Router();

const authenticate = require('../authenticate/Authenticate');

const { addPolicyLimiter, getPolicyLimiter, getAllPoliciesOfCustomerLimiter, updatePolicyLimiter, deletePolicyLimiter} = require('./Limiter');
const { addPolicy, getAllPoliciesOfCustomer, getPolicy, updatePolicy, deletePolicy } = require('../../controllers/policy/PolicyController');

router.get('/getPolicy', getPolicyLimiter, authenticate, getPolicy);
router.get('/getAllPoliciesOfCustomer', getAllPoliciesOfCustomerLimiter, authenticate, getAllPoliciesOfCustomer);
router.post('/addPolicy', addPolicyLimiter, authenticate, addPolicy);
router.put('/updatePolicy', updatePolicyLimiter, authenticate, updatePolicy);
router.delete('/deletePolicy', deletePolicyLimiter, authenticate, deletePolicy);

module.exports = router;