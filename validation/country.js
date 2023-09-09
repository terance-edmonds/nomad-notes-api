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
    search: Joi.object().keys({
        search: Joi.string().allow('', null),
        limit: Joi.number().integer().min(1).allow('', null)
    }),
    update: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required()
    })
};
