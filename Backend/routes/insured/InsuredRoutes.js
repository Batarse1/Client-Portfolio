const express = require('express');
const router = express.Router();

const authenticate = require('../authenticate/Authenticate');

const { getAllInsuredOfPolicyLimiter, addInsuredLimiter, updateInsuredLimiter, deleteInsuredLimiter } = require('./Limiter');
const { getAllInsuredOfPolicy, addInsured, updateInsured, deleteInsured } = require('../../controllers/insured/InsuredController');

router.get('/getAllInsuredOfPolicy', getAllInsuredOfPolicyLimiter, authenticate, getAllInsuredOfPolicy);
router.post('/addInsured', addInsuredLimiter, authenticate, addInsured);
router.put('/updateInsured', updateInsuredLimiter, authenticate, updateInsured);
router.delete('/deleteInsured', deleteInsuredLimiter, authenticate, deleteInsured);

module.exports = router;