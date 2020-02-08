"use strict";

var config = require('../utilities/config').config;
var jwt = require('jsonwebtoken');

//Authentication Middleware
function validateAuthorization(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Invalid request' });
    }
    const token = req.header('Authorization').replace('Bearer ', '')

    jwt.verify(token, config.TOKEN_SECRET.key, function (err, decoded) {
        if (err) {
            res.json({ message: err.message });
        } else {
            next();
        }
    });
};
module.exports = {
    validateAuthorization: validateAuthorization
}