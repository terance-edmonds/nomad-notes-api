const Joi = require('joi');

module.exports = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required()
    }),
    get: Joi.object().keys({
        id: Joi.string().required()
    }),
    remove: Joi.object().keys({
        id: Joi.string().required()
    }),
    request_reset: Joi.object().keys({
        email: Joi.string().email().required()
    }),
    update: Joi.object().keys({
        name: Joi.string().allow('', null),
        description: Joi.string().allow('', null),
        image: Joi.string().allow('', null)
    })
};
