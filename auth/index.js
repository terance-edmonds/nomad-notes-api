const jwt = require('jsonwebtoken');
const config = require('../config');
const crypt = require('../utils/crypt');

module.exports = {
    verifyToken: (req, res, next) => {
        try {
            let access_token = req.cookies.session && req.cookies.session;

            if (!access_token) {
                return res.status(401).json({
                    status: 'failed',
                    message: 'auth failed, please login'
                });
            }

            if (access_token) {
                let token = crypt.decrypt(access_token);

                jwt.verify(token, config.encryption.hash, (error, user) => {
                    if (error) {
                        return res.status(401).json({
                            status: 'failed',
                            message: 'session has expired please login',
                            error: error
                        });
                    }

                    req.cookies.auth_user = user;

                    next();
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                status: 'failed',
                message: 'auth failed'
            });
        }
    },
    isAdmin: (req, res, next) => {
        try {
            let user = req.cookies.auth_user;

            if (user.role !== 'ADMIN') {
                return res.status(403).json({
                    status: 'failed',
                    message: 'permission denied'
                });
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                status: 'failed',
                message: 'auth failed'
            });
        }
    }
};
