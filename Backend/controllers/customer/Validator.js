const joi = require('joi');

const Validator = {
    getCustomerValidator: data => {
        const validateSchema = joi.string()
            .pattern(new RegExp(process.env.ID_VALIDATOR))
            .required();

        return validateSchema.validateAsync(data);
    },
    getAllCustomersOfInsuranceCarrierValidator: data => {
        const validateSchema = joi.string()
            .min(2)
            .max(255)
            .pattern(new RegExp(process.env.ALPHANUM_VALIDATOR))
            .required();

        return validateSchema.validateAsync(data);
    },
    addCustomerValidator: data => {
        const validateSchema = joi.object({
            nit: joi.string()
                .min(17)
                .max(17)
                .pattern(new RegExp(process.env.NIT_VALIDATOR))
                .required(),
            dui: joi.string()
                .min(10)
                .max(10)
                .pattern(new RegExp(process.env.DUI_VALIDATOR)),
            name: joi.string()
                .min(2)
                .max(100)
                .pattern(new RegExp(process.env.ALPHABET_VALIDATOR))
                .required(),
            dob: joi.date()
                .required(),
            phone: joi.array()
                .items(joi.string().pattern(new RegExp(process.env.PHONE_VALIDATOR))),
            email: joi.array()
                .items(joi.string().email()),
            insuranceCarrier: joi.array()
                .items(joi.string().min(2).max(255).pattern(new RegExp(process.env.ALPHANUM_VALIDATOR)))
                .required(),
            address: joi.string()
                .min(2)
                .max(255)
                .pattern(new RegExp(process.env.ALPHANUM_VALIDATOR)),
            type: joi.string()
                .min(15)
                .max(16)
                .pattern(new RegExp(process.env.ALPHABET_VALIDATOR))
                .required()
        });

        return validateSchema.validateAsync(data);
    },
    updateCustomerValidator: data => {
        const validateSchema = joi.object({
            id: joi.string()
                .pattern(new RegExp(process.env.ID_VALIDATOR))
                .required(),
            nit: joi.string()
                .min(17)
                .max(17)
                .pattern(new RegExp(process.env.NIT_VALIDATOR)),
            dui: joi.string()
                .min(10)
                .max(10)
                .pattern(new RegExp(process.env.DUI_VALIDATOR)),
            name: joi.string()
                .min(2)
                .max(100)
                .pattern(new RegExp(process.env.ALPHABET_VALIDATOR)),
            dob: joi.date(),
            phone: joi.array()
                .items(joi.string().pattern(new RegExp(process.env.PHONE_VALIDATOR))),
            email: joi.array()
                .items(joi.string().email()),
            insuranceCarrier: joi.array()
                .items(joi.string().min(2).max(255).pattern(new RegExp(process.env.ALPHANUM_VALIDATOR))),
            address: joi.string()
                .min(2)
                .max(255)
                .pattern(new RegExp(process.env.ALPHANUM_VALIDATOR)),
            type: joi.string()
                .min(15)
                .max(16)
                .pattern(new RegExp(process.env.ALPHABET_VALIDATOR)),
            userId: joi.string()
                .pattern(new RegExp(process.env.ID_VALIDATOR))
        });

        return validateSchema.validateAsync(data);
    },
    deleteCustomerValidator: data => {
        const validateSchema = joi.object({
            id: joi.string()
                .pattern(new RegExp(process.env.ID_VALIDATOR))
                .required()
        });

        return validateSchema.validateAsync(data);
    }
};

module.exports = Validator;