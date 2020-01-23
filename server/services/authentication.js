const UserData = require('../data/userData');
const MD5 = require('md5');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Joi = require('@hapi/joi');
require('dotenv').config();

/* API to login user */
let login = async (req, res) => {

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
  });

  const { error, value } = schema.validate({ email: req.query.email, password: req.query.password });

  if (error !== undefined)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      email: value.email,
      status: true
    };

    const checkEmail = await UserData.getUsers(criteria);
    if (checkEmail.length === 0)
      return res.status(400).json({ message: 'Email not exist!' });

    criteria = {
      email: value.email,
      password: MD5(MD5(value.password))
    };

    const data = await UserData.getUsers(criteria);

    if (data && data.length == 1)
      return res.status(200).json({ message: 'Logged in successfully!', data: data });
    else
      return res.status(400).json({ message: 'Incorrect password' });

  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error: error });
  }
};

/* API to register new user */
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
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    phonenumber: Joi.string()
      .allow('')
      .pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$'))
  });

  const { error, value } = schema.validate({
    email: req.body.user.email,
    password: req.body.user.password,
    firstname: req.body.user.firstname,
    lastname: req.body.user.lastname,
    phonenumber: req.body.user.phonenumber
  });
  console.log(error)
  if (error !== undefined)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      email: value.email
    }
    
    const checkEmail = await UserData.getUsers(criteria);
    if (checkEmail && checkEmail.length === 1)
      return res.status(400).json({ message: 'email already registered' })

    let userData = {
      firstName: value.firstname,
      lastName: value.lastname,
      email: value.email,
      password: MD5(MD5(value.password)),
      phoneNumber: value.phonenumber,
      status: true
    };

    const addUser = await UserData.createUser(userData);
    if (addUser)
      return res.status(200).json({ message: 'User registration successful. Login to Continue!' })
    else
      return res.status(400).json({ message: "Something went wrong" });

  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error: error });
  }
};

/* API to forgotpassword */
let forgotpassword = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
  });

  const { error, value } = schema.validate({ email: req.body.email });

  if (error !== undefined)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      email: value.email,
      status: true
    };

    const token = crypto.randomBytes(20).toString('hex');
    const dataToSet = {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000
    };

    const updatedData = UserData.updateUser(criteria, dataToSet);

    if (updatedData.email === "") {
      return res.status(400).json({ message: 'Email not exist!' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
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
      if (err)
        return res.status(200).json({ message: err })
      else
        return res.status(200).json({ message: 'reset password link sent to your registerd email id!' })
    });
  }
  catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error: error });
  }
};


/* API to resetpassword */
let resetpassword = async (req, res) => {

  const schema = Joi.object({
    token: Joi.string()
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
  });
  const { error, value } = schema.validate({ token: req.body.token, password: req.body.password });

  if (error !== undefined)
    return res.status(400).json({ message: error.details[0].message });

  try {
    let criteria = {
      resetPasswordToken: value.token,
      status: true
    };

    const checkUser = await UserData.getUsers(criteria);

    if (checkUser.length === 0)
      return res.status(400).json({ message: 'token not valid!' });

    if (checkUser[0].resetPasswordExpires < Date.now())
      return res.status(400).json({ message: 'token expired' });



    const dataToSet = {
      resetPasswordToken: null,
      resetPasswordExpires: null,
      password: MD5(MD5(value.password))
    };

    const updatedData = UserData.updateUser(criteria, dataToSet);

    if (updatedData.email === value.email)
      return res.status(200).json({ message: 'password reset successfully! you can login with new password' });

  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error: error });
  }
};

module.exports = {
  register: register,
  login: login,
  forgotpassword: forgotpassword,
  resetpassword: resetpassword
}