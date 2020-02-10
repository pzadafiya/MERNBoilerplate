"use strict";

const MD5 = require('md5');
const randomBytes = require('randombytes');
const Joi = require('@hapi/joi');
const nodemailer = require('../utilities/nodemailer');
const dbOperation = require('../utilities/dbOperation');
const userModel = require("../models/user");
var config = require("../Utilities/config").config;
const jwt = require('jsonwebtoken');
require('dotenv').config();

/* API to login user */
let login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
      .required()
  });

  const { error, value } = schema.validate({ email: req.query.email, password: req.query.password });

  if (error)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      email: value.email
    };

    const response = await dbOperation.getData(userModel, criteria);
    if (response && response.length <= 0)
      return res.status(400).json({ message: 'Email not exist!' });

    criteria = {
      email: value.email,
      password: MD5(MD5(value.password))
    };

    const data = await dbOperation.getData(userModel, criteria);

    if (data && data.length === 0)
      return res.status(403).json({ message: 'Incorrect password' });
    else {
      const token = jwt.sign({ id: data[0]._id }, config.TOKEN_SECRET.key, { expiresIn: '1h' });
      if (data[0].status === false)
        return res.status(400).json({ isVerifiedUser: false, message: 'login failed. your email is not verified yet!' });
      else if (data[0].status === true)
        return res.status(200).json({ data: data[0], token: token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

/* API to Register new user */
let register = async (req, res) => {
  const schema = Joi.object({
    firstname: Joi.string()
      .required(),
    lastname: Joi.string()
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
      .required(),
    phonenumber: Joi.string()
      .allow('')
      .pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$'))
  });

  const { error, value } = schema.validate({
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber
  });

  if (error)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      email: value.email
    };

    const response = await dbOperation.getData(userModel, criteria);

    if (response && response.length > 0)
      return res.status(400).json({ message: 'email already registered' });

    const token = randomBytes(20).toString('hex');

    let objData = {
      firstName: value.firstname,
      lastName: value.lastname,
      email: value.email,
      password: MD5(MD5(value.password)),
      phoneNumber: value.phonenumber,
      registrationToken: token,
      status: false
    };

    const addUser = await dbOperation.createData(userModel, objData);

    if (addUser) {
      const mailTo = value.email;
      const mailSubject = 'Link To Verify Account';
      const mailContent =
        `Please click on the following link, or paste this into your browser to complete the registration process: 
      ${config.NODE_SERVER_URL.url}/verifyaccount/${token}
      If you did not request this, please ignore this email.`;

      //send verification email to user via nodemailer.
      await nodemailer.SendEmail(mailTo, mailSubject, mailContent).then(response => {
        if (response)
          return res.status(200).json('A verification link has been sent to your email account! please click on that link to verify your account!');
      }).catch(err => {
        return res.status(403).json({ message: err.response });
      });
    }
    else
      return res.status(403).json({ message: 'Something went wrong' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* API to Forgot Password */
let forgotpassword = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
  });

  const { error, value } = schema.validate({ email: req.body.email });

  if (error)
    return res.status(400).json({ message: error.details[0].message });

  try {

    let criteria = {
      email: value.email,
      status: true
    };

    const token = randomBytes(20).toString('hex');
    const dataToSet = {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000
    };

    const checkEmail = await dbOperation.getData(userModel, criteria);
    if (checkEmail.length === 0)
      return res.status(400).json({ message: 'Email not exist!' });

    //update token and expire time in db
    const updatedData = dbOperation.updateData(userModel, criteria, dataToSet);

    if (updatedData) {
      const mailTo = value.email;
      const mailSubject = 'Link To Reset Password';
      const mailContent =
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.
      Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:
      ${config.NODE_SERVER_URL.url}/resetpassword/${token}
      If you did not request this, please ignore this email and your password will remain unchanged.`;

      //send reset password email to user via nodemailer.
      await nodemailer.SendEmail(mailTo, mailSubject, mailContent).then(response => {
        if (response)
          return res.status(200).json('reset password link sent to your registerd email id!');
      }).catch(err => {
        return res.status(403).json({ message: err.response });
      });
    }
    else {
      return res.status(403).json({ message: 'Something went wrong' });
    }
  }
  catch (error) {
    console.log({ ercatch: error });
    return res.status(500).json({ message: error.message });
  }
};

/* API to Reset Password */
let resetpassword = async (req, res) => {
  const schema = Joi.object({
    token: Joi.string()
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
      .required()
  });
  const { error, value } = schema.validate({ token: req.body.token, password: req.body.password });

  if (error)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      resetPasswordToken: value.token,
      status: true
    };

    const response = await dbOperation.getData(userModel, criteria);

    if (response.length === 0)
      return res.status(403).json({ message: 'token not valid!' });

    if (response[0].resetPasswordExpires < Date.now())
      return res.status(403).json({ message: 'token expired' });

    const dataToSet = {
      resetPasswordToken: null,
      resetPasswordExpires: null,
      password: MD5(MD5(value.password))
    };

    const updatedData = dbOperation.updateData(userModel, criteria, dataToSet);

    if (updatedData.email === value.email)
      return res.status(200).json('password reset successfully! you can login with new password');

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* API to Update Profile */
let updateprofile = async (req, res) => {
  
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    firstname: Joi.string()
      .required(),
    lastname: Joi.string()
      .required(),
    phonenumber: Joi.string()
      .allow('')
      .pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$'))
  });

  const { error, value } = schema.validate({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber
  });

  if (error)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      email: value.email
    };

    const dataToSet = {
      email: value.email,
      firstName: value.firstname,
      lastName: value.lastname,
      phoneNumber: value.phonenumber
    };

    await dbOperation.updateData(userModel, criteria, dataToSet);
    const data = await dbOperation.getData(userModel, criteria);

    if (data && data.length > 0) {
      return res.status(200).json(data[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* API to Change Password */
let changepassword = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    currentpassword: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
      .required(),
    newpassword: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
      .required()
  });

  const { error, value } = schema.validate(
    {
      email: req.body.email,
      currentpassword: req.body.currentpassword,
      newpassword: req.body.newpassword
    });

  if (error)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      email: value.email,
      password: MD5(MD5(value.currentpassword)),
      status: true
    };

    const response = await dbOperation.getData(userModel, criteria);

    if (response.length === 0)
      return res.status(403).json({ message: 'current password not valid!' });

    const dataToSet = {
      password: MD5(MD5(value.newpassword))
    };

    const updatedData = await dbOperation.updateData(userModel, criteria, dataToSet);

    if (updatedData.email === value.email)
      return res.status(200).json('password change successfully! you can login with new password');

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/* API to Verify account  */
let verifyaccount = async (req, res) => {
  const schema = Joi.object({
    token: Joi.string()
      .required()
  });
  const { error, value } = schema.validate({ token: req.body.token });

  if (error)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      registrationToken: value.token
    };

    const response = await dbOperation.getData(userModel, criteria);

    if (response.length === 0)
      return res.status(403).json({ message: 'your account is already verified or token not valid.' });

    const dataToSet = {
      registrationToken: null,
      status: true
    };

    const updatedData = dbOperation.updateData(userModel, criteria, dataToSet);

    if (updatedData.email === value.email)
      return res.status(200).json('your account is successfully verified, click below button to login.');

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* API to  Re-send verification link */
let resendverificationlink = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
  });

  const { error, value } = schema.validate({
    email: req.body.email
  });

  if (error)
    return res.status(400).json({ message: error.details[0].message });

  try {

    let criteria = {
      email: value.email
    };

    const response = await dbOperation.getData(userModel, criteria);

    if (response && response.length <= 0)
      return res.status(400).json({ message: 'no user found' });

    const token = randomBytes(20).toString('hex');
    const dataToSet = {
      registrationToken: token,
      status: false
    };

    const updatedData = dbOperation.updateData(userModel, criteria, dataToSet);

    if (updatedData) {
      const mailTo = value.email;
      const mailSubject = 'Link To Verify Account';
      const mailContent =
        `Please click on the following link, or paste this into your browser to complete the registration process: 
      ${config.NODE_SERVER_URL.url}/verifyaccount/${token}
      If you did not request this, please ignore this email.`;

      //send verify account email to user via nodemailer.
      await nodemailer.SendEmail(mailTo, mailSubject, mailContent).then(response => {
        if (response)
          return res.status(200).json('A verification link has been sent to your email account! please click on that link to verify your account!');
      }).catch(err => {
        return res.status(403).json({ message: err.response });
      });
    }
    else
      return res.status(403).json({ message: 'Something went wrong' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register: register,
  login: login,
  forgotpassword: forgotpassword,
  resetpassword: resetpassword,
  updateprofile: updateprofile,
  changepassword: changepassword,
  verifyaccount: verifyaccount,
  resendverificationlink: resendverificationlink
}