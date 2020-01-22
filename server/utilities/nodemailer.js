
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'reactdemo123@gmail.com',//`${process.env.EMAIL_ADDRESS}`,
      pass: 'Reactaccount@123'//`${process.env.EMAIL_PASSWORD}`,
    },
  });

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', response);
      res.status(200).json('reset password link sent to your registerd email id!');
    }
  });