"use strict";

const express = require("express");
const router = express.Router({ mergeParams: true });
const authenticationService = require("../services/authentication");

// Authentication Routes
/* User login. */
router.get("/login", authenticationService.login);

/* User register. */
router.post("/register", authenticationService.register);

/* User forgot password. */
router.post("/forgotpassword", authenticationService.forgotpassword);

/* User reset password. */
router.put("/resetpassword", authenticationService.resetpassword);

/* User update profile. */
router.put("/updateprofile", authenticationService.updateprofile);

/* User change password. */
router.put("/changepassword", authenticationService.changepassword);

/* User verify account. */
router.put("/verifyaccount", authenticationService.verifyaccount);

/* Re-send Verification Link. */
router.put("/resendverificationlink", authenticationService.resendverificationlink);


module.exports = router;