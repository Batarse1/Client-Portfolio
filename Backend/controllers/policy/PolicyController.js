const Policy = require('../../models/policy/PolicyModel');
const Customer = require('../../models/customer/CustomerModel');

const { addPolicyValidator, updatePolicyValidator, deletePolicyValidator } = require('./Validator');

var PolicyController = {
    getPolicy: async (req, res) => {
        try {
            const policyId = req.header('id');
            const customerId = req.header('customerId');

            const customer = await Customer.findOne({
                $and: [
                    { _id: customerId },
                    { userId: req.user._id }
                ]
            });

            if (!customer) {
                throw {
                    error: true,
                    message: 'customer not found'
                };
            }

            const currentPolicy = await Policy.findOne({
                $and: [
                    { _id: policyId },
                    { customerId: customerId }
                ]
            });

            if (!currentPolicy) {
                throw {
                    error: true,
                    message: 'policy not found'
                };
            }

            return res.status(200).json({
                error: false,
                currentPolicy
            });
        }
        catch (error) {
            return res.status(404).json({
                error: error.message ?? error,
                message: 'not found'
            });
        }
    },
    getAllPoliciesOfCustomer: async (req, res) => {
        try {
            const customerId = req.header('customerId');

            const customer = await Customer.findOne({
                $and: [
                    { _id: customerId },
                    { userId: req.user._id }
                ]
            });

            if (!customer) {
                throw {
                    error: true,
                    message: 'customer not found'
                };
            }

            const { page = 1, limit = 10 } = req.query;

            const allPolicies = await Policy.find({ customerId: customerId })
                .limit()
                .skip((page - 1) * limit)
                .exec();

            const count = await Customer.countDocuments({ customerId: customerId });

            return res.status(200).json({
                error: false,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                allPolicies
            });
        }
        catch (error) {
            return res.status(404).json({
                error: error.message ?? error,
                message: 'not found'
            });
        }
    },
    addPolicy: async (req, res) => {
        try {
            await addPolicyValidator(req.body);

            const customer = await Customer.findOne({
                $and: [
                    { _id: req.body.customerId },
                    { userId: req.user._id }
                ]
            });

            if (!customer) {
                throw {
                    error: true,
                    message: 'customer not found'
                };
            }

            const newPolicy = new Policy({
                customerId: req.body.customerId,
                number: req.body.number,
                product: req.body.product,
                plan: req.body.plan,
                commission: req.body.commission,
                insuranceCarrier: req.body.insuranceCarrier,
                paymentFrequency: req.body.paymentFrequency,
                totalPremium: req.body.totalPremium,
                basicPremium: req.body.basicPremium,
                plannedPremium: req.body.plannedPremium,
                initialValidity: req.body.initialValidity,
                finalValidity: req.body.finalValidity
            });

            await newPolicy.save();

            return res.status(201).json({
                error: 'false',
                message: 'added'
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message ?? error,
                message: 'not added'
            });
        }
    },
    updatePolicy: async (req, res) => {
        try {
            await updatePolicyValidator(req.body);

            let currentPolicy = await Policy.findOne({ _id: req.body.id });

            if (currentPolicy == null){
                throw {
                    error: true,
                    message: 'policy not found'
                }
            }

            const customer = await Customer.findOne({
                $and: [
                    { _id: currentPolicy.customerId },
                    { userId: req.user._id }
                ]
            });

            if (!customer) {
                throw {
                    error: true,
                    message: 'policy not found'
                };
            }

            currentPolicy = {
                customerId: req.body.customerId || currentPolicy.customerId,
                product: req.body.product || currentPolicy.product,
                plan: req.body.plan || currentPolicy.plan,
                commission: req.body.commission || currentPolicy.commission,
                insuranceCarrier: req.body.insuranceCarrier || currentPolicy.insuranceCarrier,
                paymentFrequency: req.body.paymentFrequency || currentPolicy.paymentFrequency,
                totalPremium: req.body.totalPremium || currentPolicy.totalPremium,
                basicPremium: req.body.basicPremium || currentPolicy.basicPremium,
                plannedPremium: req.body.plannedPremium || currentPolicy.plannedPremium,
                initialValidity: req.body.initialValidity || currentPolicy.initialValidity,
                finalValidity: req.body.finalValidity || currentPolicy.finalValidity,
            }

            if (req.body.number){
                currentPolicy = {
                    number: req.body.number
                }
            }

            await Policy.findOneAndUpdate({ _id: req.body.id }, currentPolicy);

            return res.status(200).json({
                error: false,
                message: 'updated'
            });            
        }
        catch (error) {
            return res.status(400).json({
                error: error.message ?? error,
                message: 'not updated'
            });
        }
    },
    deletePolicy: async (req, res) => {
        try {
            await deletePolicyValidator(req.body);

            const currentPolicy = await Policy.findOne({ _id: req.body.id });

            if (currentPolicy == null){
                throw {
                    error: true,
                    message: 'policy not found'
                }
            }

            const customer = await Customer.findOne({
                $and: [
                    { _id: currentPolicy.customerId },
                    { userId: req.user._id }
                ]
            });

            if (!customer) {
                throw {
                    error: true,
                    message: 'policy not found'
                };
            }

            await Policy.findOneAndDelete({ _id: req.body.id }, currentPolicy);

            return res.status(200).json({
                error: false,
                message: 'deleted'
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message ?? error,
                message: 'not deleted'
            });
        }
    }
};

module.exports = PolicyController;