const Story = require('../database/models/story');
const utils = require('../utils');
const validate = require('../utils/validate');
const schemaValidation = require('../validation/story');
const commonValidation = require('../validation/common');

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
    }
};
