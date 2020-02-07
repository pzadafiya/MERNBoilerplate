"use strict";

const nodemailer = require('nodemailer');
require('dotenv').config();




// //This is the function that send email via nodemailer.
// const SendEmail = (mailTo, mailSubject, mailContent) => {

//     const mailOptions = {
//         from: `${process.env.EMAIL_ADDRESS}`,
//         to: `${mailTo}`,
//         subject: `${mailSubject}`,
//         text: `${mailContent}`
//     };

//     transporter.sendMail(mailOptions, (err, res) => {
//         return err;
//     });
// };

// exports.SendEmail = SendEmail;

async function wrapedSendMail(mailOptions) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`,
            },
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                // console.log("error is " + error);
                reject(error); // or use rejcet(false) but then you will have to handle errors
                // return error;
            }
            else {
                // console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    });
};

const SendEmail = async (mailTo, mailSubject, mailContent) => {
    let mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${mailTo}`,
        subject: `${mailSubject}`,
        text: `${mailContent}`
    };

    await wrapedSendMail(mailOptions).then(res => {

        console.log({ response: res });
        return res;
    }).catch(err => {
        // console.log({ err: err.response });
        throw err;
    });
}

exports.wrapedSendMail = wrapedSendMail;