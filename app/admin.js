const bcrypt = require('bcrypt');
const User = require('../database/models/user');
const schemaValidation = require('../validation/admin');
const validate = require('../utils/validate');
const utils = require('../utils');
const userUtils = require('../utils/user');

const salt = bcrypt.genSaltSync(10);

module.exports = {
    create: async (req, res) => {
        try {
            let body = req.body;

            /* validate request data */
            const validation = validate(schemaValidation.create, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const exist = await User.findOne({ email: body.email, role: userUtils.roles.ADMIN });

            if (exist) {
                return res.status(409).json({
                    status: 'failed',
                    message: 'user with the email already exist'
                });
            }

            const user = new User({
                name: body.name,
                email: body.email,
                password: bcrypt.hashSync(body.password, salt),
                role: userUtils.roles.ADMIN
            });

            await user.save();

            return res.status(200).json({
                status: 'success',
                message: 'user signup successful'
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

            const user = await User.findOne(
                { _id: utils.mongoID(params.id), role: userUtils.roles.ADMIN },
                { password: false }
            );

            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'user not found'
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

            const users = await User.find(
                {
                    $or: [
                        { name: { $regex: query.search, $options: 'i' } },
                        { email: { $regex: query.search, $options: 'i' } }
                    ],
                    role: userUtils.roles.ADMIN
                },
                { password: false }
            );

            return res.status(200).json({
                status: 'success',
                data: users
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

            if (body.email) {
                const exist = await User.findOne(
                    { email: body.email, role: userUtils.roles.USER },
                    { password: false }
                );

                if (exist && exist?._id.toString() !== params.id) {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'email already exists'
                    });
                }
            }

            const user = await User.findOne(
                { _id: utils.mongoID(params.id), role: userUtils.roles.ADMIN },
                { password: false }
            );

            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'user not found'
                });
            }

            for (const key in body) {
                user[key] = body[key];
            }

            await user.save();

            return res.status(200).json({
                status: 'success',
                message: 'user details updated'
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

            const user = await User.findOne({ _id: params.id, role: userUtils.roles.ADMIN });

            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'user not found'
                });
            }

            await user.deleteOne();

            return res.status(200).json({
                status: 'success',
                message: 'user deleted'
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
