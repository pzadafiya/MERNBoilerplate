"use strict";

//Include config and modules
const express = require("express");
const router = express.Router({ mergeParams: true });
const authenticationService = require("../services/authentication");
const authenticationMiddleware = require("../utilities/authValidate");
const userimagesMiddleware = require("../utilities/imgUtils");

// Authentication Routes

/* route for user login. */
router.get(
    "/login",
    authenticationService.login
);

/* route for user register. */
router.post(
    "/register",
    authenticationService.register
);

/* route for user forgot password. */
router.get(
    "/forgotpassword",
    authenticationService.forgotpassword
);

/* route for user reset password. */
router.put(
    "/resetpassword",
    authenticationService.resetpassword
);

/* route for user update profile. */
router.post(
    "/updateprofile",
    authenticationMiddleware.validateAuthorization,
    userimagesMiddleware,
    authenticationService.updateprofile
);

/* route for user change password. */
router.post(
    "/changepassword",
    authenticationMiddleware.validateAuthorization,
    authenticationService.changepassword
);

/* route for user verify account. */
router.post(
    "/verifyaccount",
    authenticationService.verifyaccount
);

/* route for user Re-send Verification Link. */
router.post(
    "/resendverificationlink",
    authenticationService.resendverificationlink
);

module.exports = router;