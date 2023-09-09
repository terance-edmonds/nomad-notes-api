const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const schemaValidation = require('../validation/auth');
const crypt = require('../utils/crypt');
const validate = require('../utils/validate');
const config = require('../config');
const ResetToken = require('../database/models/reset-tokens');
const mail = require('../mail');
const otpGenerator = require('otp-generator');
const userUtils = require('../utils/user');

const salt = bcrypt.genSaltSync(10);

module.exports = {
    signup: async (req, res) => {
        try {
            let body = req.body;

            /* validate request data */
            const validation = validate(schemaValidation.signup, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const exist = await User.findOne({ email: body.email, role: userUtils.roles.USER });

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
                role: userUtils.roles.USER
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
    signin: async (req, res) => {
        try {
            let body = req.body;

            /* validate request data */
            const validation = validate(schemaValidation.signin, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const user = await User.findOne({ email: body.email, role: userUtils.roles.USER });

            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'user not found'
                });
            }

            if (!bcrypt.compareSync(body.password, user.password)) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'incorrect password'
                });
            }

            // generate a token for 1h
            let token = jwt.sign({ user_id: user._id, email: user.email }, config.encryption.hash, {
                expiresIn: '24h'
            });

            // encrypt token
            let encrypted_token = crypt.encrypt(token);

            // pass the tokens through cookies
            res.cookie('session', encrypted_token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });

            return res.status(200).json({
                status: 'success',
                message: 'user signup successful',
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    },
    signout: async (req, res) => {
        try {
            res.cookie('session', '', { httpOnly: true });

            return res.status(200).json({
                status: 'success',
                message: 'user signed out'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    },
    request_password_change: async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            /* validate request data */
            const validation = validate(schemaValidation.request_reset, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const user = await User.findOne({ email: body.email });

            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'user not found'
                });
            }

            const token = new ResetToken({
                email: body.email,
                user_id: user._id.toString(),
                otp: Number(
                    otpGenerator.generate(4, {
                        digits: true,
                        upperCaseAlphabets: false,
                        lowerCaseAlphabets: false,
                        specialChars: false
                    })
                )
            });
            await token.save();

            await mail({
                mailOptions: {
                    to: body.email,
                    subject: 'Reset Password',
                    html: `Reset password OTP: ${token.otp}`
                }
            });

            return res.status(200).json({
                status: 'success',
                message: 'reset password email sent'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    },
    reset_password: async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            /* validate request data */
            const validation = validate(schemaValidation.change_password, body);
            if (validation?.error) return res.status(400).json(validation.error);

            const user = await User.findOne({ email: body.email });

            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'user not found'
                });
            }

            const token = await ResetToken.findOne({
                email: body.email,
                otp: body.otp
            });

            if (!token) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'invalid token'
                });
            }
            await token.deleteOne();

            user.password = bcrypt.hashSync(body.password, salt);
            user.save();

            return res.status(200).json({
                status: 'success',
                message: 'password changed'
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
