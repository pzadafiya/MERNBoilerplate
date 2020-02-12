"use strict";

var config = require('../utilities/config').config;
var jwt = require('jsonwebtoken');
const userModel = require("../models/user");

//Authentication Middleware
function validateAuthorization(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Invalid request' });
    }
    const token = req.header('Authorization').replace('Bearer ', '')
    jwt.verify(token, config.TOKEN_SECRET.key, function (err, decoded) {

        if (err) return res.status(400).send({ message: 'Failed to authenticate token.' });
        //check for user is valid or not 
        userModel.findById(decoded.id, { password: 0 },
            function (err, user) {
                if (err) return res.status(500).send({ message: "There was a problem finding the user." });
                if (!user) return res.status(404).send({ message: "No user found." });
                //authenticate user and store userid in req.
                req.userId = decoded.id;
                next(); // add this line
            });
    });
};
module.exports = {
    validateAuthorization: validateAuthorization
}