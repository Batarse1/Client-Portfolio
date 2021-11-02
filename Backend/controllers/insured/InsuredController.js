const Insured = require('../../models/insured/InsuredModel');
const Policy = require('../../models/policy/PolicyModel');

const { addInsuredValidator, getAllInsuredOfPolicyValidator, updateInsuredValidator, deleteInsuredValidator } = require('./Validator');

var InsuredController = {
    getAllInsuredOfPolicy: async (req, res) => {
        try {
            await getAllInsuredOfPolicyValidator(req.body);

            const policy = Policy.findOne({ _id: req.body.policyId });

            if (!policy) {
                throw {
                    error: true,
                    message: 'policy not found'
                };
            }

            const { page = 1, limit = 10 } = req.query;

            console.log(req.body.policyId);

            const allInsured = await Insured.find({ policyId: [req.body.policyId] })
                .limit()
                .skip((page - 1) * limit)
                .exec();

            const count = await Insured.countDocuments({ policyId: [req.body.policyId] });

            return res.status(200).json({
                error: false,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                allInsured
            });
        }
        catch (error) {
            return res.status(500).json({
                error: error.details != null ? error.details[0].message : error.message,
                message: 'not found'
            });
        }
    },
    addInsured: async (req, res) => {
        try {
            await addInsuredValidator(req.body);

            const policy = Policy.findOne({ _id: req.body.policyId });

            if (!policy) {
                throw {
                    error: true,
                    message: 'policy not found'
                };
            }

            const newInsured = new Insured({
                nit: req.body.nit,
                dui: req.body.dui,
                name: req.body.name,
                dob: req.body.dob,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                type: req.body.type,
                policyId: req.body.policyId
            });

            await newInsured.save();

            return res.status(201).json({
                error: 'false',
                message: 'added'
            });
        }
        catch (error) {
            return res.status(500).json({
                error: error.details != null ? error.details[0].message : error.message,
                message: 'not added'
            });
        }
    },
    updateInsured: async (req, res) => {
        try {
            await updateInsuredValidator(req.body);

            var currentInsured = await Insured.findOne({ _id: req.body.id });

            if (currentInsured == null) {
                throw {
                    error: true,
                    message: 'insured not found'
                };
            }

            currentInsured = {
                name: req.body.name || currentInsured.name,
                dob: req.body.dob || currentInsured.dob,
                phone: req.body.phone || currentInsured.phone,
                email: req.body.email || currentInsured.email,
                address: req.body.address || currentInsured.address,
                type: req.body.type || currentInsured.type,
                policyId: req.body.policyId || currentInsured.policyId
            };
            
            if (req.body.nit){
                currentInsured = {
                    nit: req.body.nit
                }
            }

            if (req.body.dui){
                currentInsured = {
                    nit: req.body.dui
                }
            }

            await Insured.findOneAndUpdate({ _id: req.body.id }, currentInsured);

            return res.status(200).json({
                error: false,
                message: 'updated'
            });
        }
        catch (error) {
            return res.status(500).json({
                error: error.details != null ? error.details[0].message : error,
                message: 'not updated'
            });
        }
    },
    deleteInsured: async (req, res) => {
        try {
            await deleteInsuredValidator(req.body);

            const currentInsured = await Insured.findOne({ _id: req.body.id });

            if (currentInsured == null) {
                throw {
                    error: true,
                    message: 'insured not found'
                };
            }

            await Insured.findOneAndDelete({ _id: req.body.id }, currentInsured);

            return res.status(200).json({
                error: false,
                message: 'deleted'
            });
        }
        catch (error) {
            return res.status(500).json({
                error: error.details != null ? error.details[0].message : error,
                message: 'not deleted'
            });
        }
    }
};

module.exports = InsuredController;