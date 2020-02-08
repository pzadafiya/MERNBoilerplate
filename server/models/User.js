"use strict";


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the MongoDB schema for the people collection
let user = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        select: false
    },
    phoneNumber: {
        "type": String
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    registrationToken: {
        type: String,
        default: null
    },
    
});


module.exports = mongoose.model('user', user);
