const Country = require('../database/models/country');
const schemaValidation = require('../validation/country');
const validate = require('../utils/validate');
const utils = require('../utils');

module.exports = {
    create: async (req, res) => {
        try {
            let body = req.body;

            /* validate request data */
            const validation = validate(schemaValidation.create, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const exist = await Country.findOne({ name: body.name });

            if (exist) {
                return res.status(409).json({
                    status: 'failed',
                    message: 'country already exist'
                });
            }

            const country = new Country({
                name: body.name,
                email: body.email,
                image: body.image
            });

            await country.save();

            return res.status(200).json({
                status: 'success',
                message: 'country created'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    },
    get: async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            /* validate request data */
            const validation = validate(schemaValidation.get, params);
            if (validation?.error) return res.status(400).json(validation.error);

            const country = await Country.findById(utils.mongoID(params.id));

            if (!country) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'country not found'
                });
            }

            return res.status(200).json({
                status: 'success',
                data: user
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    },
    all: async (req, res) => {
        try {
            let query = req.query;

            /* validate request data */
            const validation = validate(schemaValidation.search, query);
            if (validation?.error) return res.status(400).json(validation.error);

            const countries = await Country.find({ name: { $regex: query.search, $options: 'i' } });

            return res.status(200).json({
                status: 'success',
                data: countries
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    },
    update: async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            /* validate request data */
            const validation = validate(schemaValidation.update, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const exist = await Country.findOne({ name: body.name });

            if (exist && exist._id.toString() != params.id) {
                return res.status(409).json({
                    status: 'failed',
                    message: 'country name already found'
                });
            }

            const country = await Country.findById(utils.mongoID(params.id));

            if (!country) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'country not found'
                });
            }

            for (const key in body) {
                country[key] = body[key];
            }

            await country.save();

            return res.status(200).json({
                status: 'success',
                message: 'country details updated'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    },
    remove: async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            /* validate request data */
            const validation = validate(schemaValidation.remove, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const country = await Country.findById(utils.mongoID(body.id));

            if (!country) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'country not found'
                });
            }

            await country.remove();

            return res.status(200).json({
                status: 'success',
                message: 'country deleted'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    }
};
