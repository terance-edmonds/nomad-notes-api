const Story = require('../database/models/story');
const utils = require('../utils');
const validate = require('../utils/validate');
const schemaValidation = require('../validation/story');
const commonValidation = require('../validation/common');
const Country = require('../database/models/country');

module.exports = {
    create: async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            /* validate request data */
            const validation = validate(schemaValidation.create, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const story = new Story({
                user_id: utils.mongoID(body.user_id),
                title: body.title,
                review: body.review,
                country: body.country,
                location: body.location,
                image: body.image,
                when: body.when
            });

            await story.save();

            return res.status(200).json({
                status: 'success',
                message: 'story created'
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

            const story = await Story.findOne({ _id: utils.mongoID(params.id) });

            if (!story) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'story details not found'
                });
            }

            return res.status(200).json({
                status: 'success',
                data: story
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
            let body = req.body;
            let params = req.params;
            let query = req.query;

            /* validate request data */
            const validation = validate(commonValidation.all, query);
            if (validation?.error) return res.status(400).json(validation.error);

            const stories = await Story.find({}).limit(query.limit);

            return res.status(200).json({
                status: 'success',
                data: stories
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    },
    search: async (req, res) => {
        try {
            let query = req.query;

            /* validate request data */
            const validation = validate(schemaValidation.search, query);
            if (validation?.error) return res.status(400).json(validation.error);

            let options = {};

            if (query?.country) options['country'] = { $regex: query.country, $options: 'i' };
            if (query?.city) options['city'] = { $regex: query.city, $options: 'i' };

            const stories = await Story.find(options).limit(query.limit);

            return res.status(200).json({
                status: 'success',
                data: stories
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
            const validation = validate(schemaValidation.remove, params);
            if (validation?.error) return res.status(400).json(validation.error);

            const story = await Story.findOne({ _id: params.id });

            if (!story) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'story not found'
                });
            }

            await story.deleteOne();

            return res.status(200).json({
                status: 'success',
                message: 'story deleted'
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

            const story = await Story.findById(utils.mongoID(params.id));

            if (!story) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'story not found'
                });
            }

            for (const key in body) {
                story[key] = body[key];
            }

            await story.save();

            return res.status(200).json({
                status: 'success',
                message: 'story details updated'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    },
    state: async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            /* validate request data */
            const validation = validate(schemaValidation.state, body);
            if (validation?.error) return res.status(400).json(validation.error);

            if (body.approved) {
                const country = await Country.findOne({
                    name: body.country
                });

                if (!country) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'country details not found, please add country details'
                    });
                }
            }

            const story = await Story.findById(utils.mongoID(params.id));

            if (!story) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'story not found'
                });
            }

            story.approved = !!body.approved;

            await story.save();

            return res.status(200).json({
                status: 'success',
                message: `story ${body.approved ? 'approved' : 'state changed'}`
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
