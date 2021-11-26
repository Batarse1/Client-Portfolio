const express = require('express');
const router = express.Router();

const authenticate = require('../authenticate/Authenticate');

const { getMonthlyPaymentLimiter } = require('./Limiter');
const { getMonthlyPayment } = require('../../controllers/report/ReportController');

router.get('/getMonthlyPayment', getMonthlyPaymentLimiter, authenticate, getMonthlyPayment);

module.exports = router;