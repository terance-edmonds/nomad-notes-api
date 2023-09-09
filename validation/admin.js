const Joi = require('joi');

module.exports = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string()
            .regex(/^\S+@\S+\.\S+$/)
            .required(),
        password: Joi.string().required()
    }),
    get: Joi.object().keys({
        id: Joi.string().required()
    }),
    remove: Joi.object().keys({
        id: Joi.string().required()
    }),
    update: Joi.object().keys({
        name: Joi.string().allow('', null),
        email: Joi.string().allow('', null),
        image: Joi.string().allow('', null)
    }),
    search: Joi.object().keys({
        search: Joi.string().allow('', null),
        limit: Joi.number().integer().min(1).allow('', null)
    })
};
