const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const schemaValidation = require('../validation/user');
const crypt = require('../utils/crypt');
const validate = require('../utils/validate');
const config = require('../config');
const ResetToken = require('../database/models/reset-tokens');
const mail = require('../mail');
const otpGenerator = require('otp-generator');
const utils = require('../utils');
const userUtils = require('../utils/user');

const salt = bcrypt.genSaltSync(10);

module.exports = {
    get: async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            /* validate request data */
            const validation = validate(schemaValidation.get, params);
            if (validation?.error) return res.status(400).json(validation.error);

            const user = await User.findOne({ _id: utils.mongoID(params.id) }, { password: false });

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
            const users = await User.find({ role: userUtils.roles.USER }, { password: false });

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
                { _id: utils.mongoID(params.id), role: userUtils.roles.USER },
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
    change_password: async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            /* validate request data */
            const validation = validate(schemaValidation.change_password, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const user = await User.findOne({ _id: utils.mongoID(params.id) }, { password: false });

            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'user not found'
                });
            }

            user.password = bcrypt.hashSync(body.password, salt);

            await user.save();

            return res.status(200).json({
                status: 'success',
                message: 'user password changed'
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

            const user = await User.findOne({ _id: params.id, role: userUtils.roles.USER });

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
