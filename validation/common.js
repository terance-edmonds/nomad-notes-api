const Joi = require('joi');

module.exports = {
    get: Joi.object().keys({
        id: Joi.string().required()
    }),
    all: Joi.object().keys({
        limit: Joi.number().integer().min(1).allow('', null)
    })
};
