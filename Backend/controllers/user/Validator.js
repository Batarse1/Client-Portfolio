const joi = require('joi');

const Validator = {
    signInValidator: data => {
        const validateSchema = joi.object({
            username: joi.string()
                .min(6)
                .max(64)
                .alphanum()
                .required(),
            password: joi.string()
                .min(12)
                .max(128)
                .pattern(new RegExp(process.env.PASSWORD_VALIDATOR))
                .required()
        });

        return validateSchema.validateAsync(data);
    },
    loginValidator: data => {
        const validateSchema = joi.object({
            username: joi.string()
                .min(6)
                .max(64)
                .alphanum()
                .required(),
            password: joi.string()
                .min(12)
                .max(128)
                .pattern(new RegExp(process.env.PASSWORD_VALIDATOR))
                .required()
        });

        return validateSchema.validateAsync(data);
    }
};

module.exports = Validator;