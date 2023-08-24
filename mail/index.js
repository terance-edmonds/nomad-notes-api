const nodemailer = require('nodemailer');
const config = require('../config');

const initialMailOptions = {
    to: '',
    from: config.mail.email,
    subject: '',
    html: ''
};

const initialTransportOptions = {
    host: config.mail.domain,
    port: 465,
    secure: true, // use TLS
    auth: {
        user: config.mail.email,
        pass: config.mail.password
    }
};

module.exports = ({
    mailOptions = initialMailOptions,
    transporterOptions = initialTransportOptions
}) => {
    return new Promise((resolve, reject) => {
        try {
            console.table(mailOptions);
            /* const transporter = nodemailer.createTransport(transporterOptions);

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) return resolve({ error });

                resolve(info);
            }); */
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};
