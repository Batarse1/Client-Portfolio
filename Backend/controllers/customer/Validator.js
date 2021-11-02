const joi = require('joi');

const Validator = {
    getAllCustomersOfInsuranceCarrier: data => {
        const validateSchema = joi.object({
            insuranceCarrier: joi.string()
                .required(),
        });

        return validateSchema.validateAsync(data);
    },
    addCustomerValidator: data => {
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
            insuranceCarrier: joi.array()
                .items(joi.string())
                .required(),
            address: joi.string(),
            type: joi.string()
                .required(),
            userId: joi.string()
                .required(),
        });

        return validateSchema.validateAsync(data);
    },
    updateCustomerValidator: data => {
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
            insuranceCarrier: joi.array()
                .items(joi.string()),
            address: joi.string(),
            type: joi.string(),
            userId: joi.string()
        });

        return validateSchema.validateAsync(data);
    },
    deleteCustomerValidator: data => {
        const validateSchema = joi.object({
            id: joi.string()
                .required()
        });

        return validateSchema.validateAsync(data);
    }
};

module.exports = Validator;