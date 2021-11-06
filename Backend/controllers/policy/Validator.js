const joi = require('joi');

const Validator = {
    addPolicyValidator: data => {
        const validateSchema = joi.object({
            customerId: joi.string()
                .pattern(new RegExp(process.env.ID_VALIDATOR))
                .required(),
            number: joi.string()
                .min(1)
                .max(100)
                .pattern(new RegExp(process.env.ALPHANUMWITHHYPHEN_VALIDATOR))
                .required(),
            product: joi.string()
                .min(2)
                .max(100)
                .pattern(new RegExp(process.env.ALPHANUMWITHHYPHEN_VALIDATOR))
                .required(),
            plan: joi.string()
                .min(2)
                .max(100)
                .pattern(new RegExp(process.env.ALPHANUMWITHHYPHEN_VALIDATOR))
                .required(),
            commission: joi.number()
                .positive()
                .allow(0)
                .required(),
            insuranceCarrier: joi.string()
                .min(2)
                .max(255)
                .pattern(new RegExp(process.env.ALPHANUM_VALIDATOR))
                .required(),
            paymentFrequency: joi.number()
                .positive()
                .allow(0)
                .required(),
            totalPremium: joi.number()
                .positive()
                .allow(0)
                .required(),
            basicPremium: joi.number()
                .positive()
                .allow(0),
            plannedPremium: joi.number()
                .positive()
                .allow(0)
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
                .pattern(new RegExp(process.env.ID_VALIDATOR))
                .required(),
            customerId: joi.string()
                .pattern(new RegExp(process.env.ID_VALIDATOR)),
            number: joi.string()
                .min(1)
                .max(100)
                .pattern(new RegExp(process.env.ALPHANUMWITHHYPHEN_VALIDATOR)),
            product: joi.string()
                .min(2)
                .max(100)
                .pattern(new RegExp(process.env.ALPHANUMWITHHYPHEN_VALIDATOR)),
            plan: joi.string()
                .min(2)
                .max(100)
                .pattern(new RegExp(process.env.ALPHANUMWITHHYPHEN_VALIDATOR)),
            commission: joi.number()
                .positive()
                .allow(0),
            insuranceCarrier: joi.string()
                .min(2)
                .max(255)
                .pattern(new RegExp(process.env.ALPHANUM_VALIDATOR)),
            paymentFrequency: joi.number()
                .positive()
                .allow(0),
            totalPremium: joi.number()
                .positive()
                .allow(0),
            basicPremium: joi.number()
                .positive()
                .allow(0),
            plannedPremium: joi.number()
                .positive()
                .allow(0),
            initialValidity: joi.date(),
            finalValidity: joi.date()
        });

        return validateSchema.validateAsync(data);
    },
    deletePolicyValidator: data => {
        const validateSchema = joi.object({
            id: joi.string()
                .pattern(new RegExp(process.env.ID_VALIDATOR))
                .required(),
        });

        return validateSchema.validateAsync(data);
    }
}

module.exports = Validator;