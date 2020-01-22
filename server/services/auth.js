// const config = require("../utilities/config").config;
const UserData = require('../data/userData');
const MD5 = require('../node_modules/md5');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

/* API to register new user */
let register = async (req, res) => {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(400).json({ message: 'Parameters are missing' })
  } else {
    try {
      let criteria = {
        email: req.body.user.email
      }
      const checkEmail = await UserData.getUsers(criteria);
      if (checkEmail && checkEmail.length == 1) {
        res.status(400).json({ message: 'email already registered' })
      } else {
        let userData = {
          firstName: req.body.user.firstname ? req.body.user.firstname : "",
          lastName: req.body.user.lastname ? req.body.user.lastname : "",
          email: req.body.user.email,
          phone: req.body.user.phone,
          password: MD5(MD5(req.body.user.password)),
          status: true
        };
        const addUser = await UserData.createUser(userData);
        // console
        if (addUser) {
          res.status(200).json({ message: 'User registration successful. Login to Continue!' })
        } else {
          res.status(400).json({ message: "Something went wrong" });
        }
      }
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error: error });
    }
  }
};

/* API to login user */
let login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'Parameters are missing' });
  } else {
    try {

      let criteria = {
        email: req.body.email,
        status: true
      };

      const checkEmail = await UserData.getUsers(criteria);
      if (checkEmail.length === 1) {
        let criteria = {
          email: req.body.email,
          password: MD5(MD5(req.body.password))
        };
        const data = await UserData.getUsers(criteria);

        if (data && data.length == 1) {
          res.status(200).json({ message: 'Logged in successfully!', data: data });
        } else {
          res.status(400).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(400).json({ message: 'Email not exist!' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong', error: error });
    }
  }
};

/* API to forgotpassword */
let forgotpassword = async (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ message: 'Parameters are missing' });
  } else {
    try {
      let criteria = {
        email: req.body.email,
        status: true
      };
      const token = crypto.randomBytes(20).toString('hex');
      const dataToSet = {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000
      };
      const updatedData = UserData.updateUser(criteria, dataToSet);

      if (updatedData.email != "") {
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'reactdemo123@gmail.com',//`${process.env.EMAIL_ADDRESS}`,
            pass: 'Reactaccount@123'//`${process.env.EMAIL_PASSWORD}`,
          },
        });
        
        const mailOptions = {
          from: 'reactdemo123@gmail.com',
          to: 'reactdemo123@gmail.com',//`${user.email}`,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3000/resetpassword/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json({ message: 'reset password link sent to your registerd email id!' })
          }
        });
      } else {
        res.status(400).json({ message: 'Email not exist!' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong', error: error });
    }
  }
};

/* API to resetpassword */
let resetpassword = async (req, res) => {
  if (!req.body.token) {
    res.status(400).json({ message: 'token not defined' });
  } else {
    try {
      let criteria = {
        resetPasswordToken: req.body.token,
        status: true
      };
      const checkUser = await UserData.getUsers(criteria);
      if (checkUser.length == 1) {

        const dataToSet = {
          resetPasswordToken: null,
          resetPasswordExpires: null,
          password: MD5(MD5(req.body.password))
        };

        const updatedData = UserData.updateUser(criteria, dataToSet);
        if (updatedData.email != "") {
          res.status(200).json({ message: 'password reset successfully! you can login with new password', 'isValid': true });
        }
      } else {
        res.status(400).json({ message: 'token not valid!' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong', error: error });
    }
  }
};

module.exports = {
  register: register,
  login: login,
  forgotpassword: forgotpassword,
  resetpassword: resetpassword
}