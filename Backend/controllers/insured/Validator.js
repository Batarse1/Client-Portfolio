const joi = require('joi');

const Validator = {
    getAllInsuredOfPolicyValidator: data => {
        const validateSchema = joi.object({
            policyId: joi.string()
                .required(),
        });

        return validateSchema.validateAsync(data);
    },
    addInsuredValidator: data => {
        const validateSchema = joi.object({
            nit: joi.string()
                .required(),
            dui: joi.string(),
            name: joi.string()
                .required(),
            dob: joi.date()
                .required(),
            phone: joi.array()
                .items(joi.string()),
            email: joi.array()
                .items(joi.string()),
            address: joi.string(),
            type: joi.string()
                .required(),
            policyId: joi.array()
                .items(joi.string())
                .required(),
        });

        return validateSchema.validateAsync(data);
    },
    updateInsuredValidator: data => {
        const validateSchema = joi.object({
            id: joi.string()
                .required(),
            nit: joi.string(),
            dui: joi.string(),
            name: joi.string(),
            dob: joi.date(),
            phone: joi.array()
                .items(joi.string()),
            email: joi.array()
                .items(joi.string()),
            address: joi.string(),
            type: joi.string(),
            policyId: joi.array()
                .items(joi.string())
        });

        return validateSchema.validateAsync(data);
    },
    deleteInsuredValidator: data => {
        const validateSchema = joi.object({
            id: joi.string()
                .required(),
        });

        return validateSchema.validateAsync(data);
    }
};

module.exports = Validator;