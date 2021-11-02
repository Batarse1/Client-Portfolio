const express = require('express');
const router = express.Router();

const { addCustomerLimiter, updateCustomerLimiter, deleteCustomerLimiter, getCustomerLimiter, getAllCustomersOfUserLimiter, getAllCustomersOfInsuranceCarrierLimiter } = require('./Limiter');
const authenticate = require('../authenticate/Authenticate');
const { getCustomer, getAllCustomersOfUser, getAllCustomersOfInsuranceCarrier , addCustomer, updateCustomer, deleteCustomer } = require('../../controllers/customer/CustomerController');

router.get('/getCustomer', getCustomerLimiter, authenticate, getCustomer);
router.get('/getAllCustomersOfUser', getAllCustomersOfUserLimiter, authenticate, getAllCustomersOfUser);
router.get('/getAllCustomersOfInsuranceCarrier', getAllCustomersOfInsuranceCarrierLimiter, authenticate, getAllCustomersOfInsuranceCarrier);
router.post('/addCustomer', addCustomerLimiter, authenticate, addCustomer);
router.put('/updateCustomer', updateCustomerLimiter, authenticate, updateCustomer);
router.delete('/deleteCustomer', deleteCustomerLimiter, authenticate, deleteCustomer);

module.exports = router;