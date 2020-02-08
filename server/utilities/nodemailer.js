"use strict";

const nodemailer = require('nodemailer');
require('dotenv').config();

async function SendEmail(mailTo, mailSubject, mailContent) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`,
            },
        });

        const mailOptions = {
            from: `${process.env.EMAIL_ADDRESS}`,
            to: `${mailTo}`,
            subject: `${mailSubject}`,
            text: `${mailContent}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) reject(error);
            else resolve(true);
        });
    });
};

exports.SendEmail = SendEmail;