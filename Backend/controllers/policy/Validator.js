const joi = require('joi');

const Validator = {
    addPolicyValidator: data => {
        const validateSchema = joi.object({
            customerId: joi.string()
                .required(),
            number: joi.string()
                .required(),
            product: joi.string()
                .required(),
            plan: joi.string()
                .required(),
            commission: joi.number()
                .required(),
            insuranceCarrier: joi.string()
                .required(),
            paymentFrequency: joi.string()
                .required(),
            totalPremium: joi.number()
                .required(),
            basicPremium: joi.number(),
            plannedPremium: joi.number()
                .required(),
            initialValidity: joi.date()
                .required(),
            finalValidity: joi.date()
                .required(),
        });

        return validateSchema.validateAsync(data);
    },
    updatePolicyValidator: data => {
        const validateSchema = joi.object({
            id: joi.string()
                .required(),
            customerId: joi.string(),
            number: joi.string(),
            product: joi.string(),
            plan: joi.string(),
            commission: joi.number(),
            insuranceCarrier: joi.string(),
            paymentFrequency: joi.string(),
            totalPremium: joi.number(),
            basicPremium: joi.number(),
            plannedPremium: joi.number(),
            initialValidity: joi.date(),
            finalValidity: joi.date()
        });

        return validateSchema.validateAsync(data);
    },
    deletePolicyValidator: data => {
        const validateSchema = joi.object({
            id: joi.string()
                .required(),
        });

        return validateSchema.validateAsync(data);
    }
}

module.exports = Validator;