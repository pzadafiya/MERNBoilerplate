const express = require("express");

const router = express.Router({ mergeParams: true });
const authenticationService = require("../services/authentication");

/* User Registration and login using rest api. */
// Get /login : user login
// Post /register : create new user and return new crated user object
// Put /resetpassword/ : update user password and return user object
// Delete /users/:id : Delete user and return deleted user object

/* User Login. */
router.get("/login", authenticationService.login);

/* User register. */
router.post("/register", authenticationService.register);

/* User forgotpassword. */
router.post("/forgotpassword", authenticationService.forgotpassword);

/* User resetpassword. */
router.put("/resetpassword", authenticationService.resetpassword);

module.exports = router;