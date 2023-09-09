const Joi = require('joi');

module.exports = {
    create: Joi.object().keys({
        user_id: Joi.string().required(),
        title: Joi.string().required(),
        review: Joi.string().required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        when: Joi.string().isoDate().required(),
        image: Joi.string().required()
    }),
    get: Joi.object().keys({
        id: Joi.string().required()
    }),
    search: Joi.object().keys({
        search: Joi.string().allow('', null),
        limit: Joi.number().integer().min(1).allow('', null)
    }),
    remove: Joi.object().keys({
        id: Joi.string().required()
    }),
    state: Joi.object().keys({
        approved: Joi.boolean().required()
    }),
    update: Joi.object().keys({
        title: Joi.string().required(),
        review: Joi.string().required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        when: Joi.string().isoDate().required(),
        image: Joi.string().required(),
        country: Joi.string().required()
    })
};
