"use strict";

const nodemailer = require('nodemailer');
require('dotenv').config();

// This is the function that send email using Nodemailer module.
async function SendEmail(mailTo, mailSubject, mailContent) {
    return new Promise((resolve, reject) => {
        
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`,
            },
        });

        // send mail with defined transport object
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