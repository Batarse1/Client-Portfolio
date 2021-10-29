const joi = require('joi');

const Validator = {
    signInValidator: data => {
        const validateSchema = joi.object({
            username: joi.string()
                .required(),
            password: joi.string()
                .required()
        });

        return validateSchema.validateAsync(data);
    },
    loginValidator: data => {
        const validateSchema = joi.object({
            username: joi.string()
                .required(),
            password: joi.string()
                .required()
        });

        return validateSchema.validateAsync(data);
    }
};

module.exports = Validator;