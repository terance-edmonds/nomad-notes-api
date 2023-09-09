const Joi = require('joi');

module.exports = {
    signin: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    request_reset: Joi.object().keys({
        email: Joi.string().email().required()
    }),
    change_password: Joi.object().keys({
        otp: Joi.number().integer().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirm_password: Joi.any()
            .equal(Joi.ref('password'))
            .label('confirm password')
            .messages({ 'any.only': '{{#label}} does not match' })
            .required()
    }),
    signup: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirm_password: Joi.any()
            .equal(Joi.ref('password'))
            .label('confirm password')
            .messages({ 'any.only': '{{#label}} does not match' })
            .required()
    })
};
