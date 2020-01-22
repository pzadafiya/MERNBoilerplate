const express = require("../node_modules/express");

const router = express.Router({ mergeParams: true });
const authService = require("../services/auth");

/* User Registration and login using rest api. */
// Get /login : user login
// Post /register : create new user and return new crated user object
// Put /resetpassword/ : update user password and return user object
// Delete /users/:id : Delete user and return deleted user object

/* User Login. */
router.get("/login", authService.login);

/* User register. */
router.post("/register", authService.register);

/* User forgotpassword. */
router.post("/forgotpassword", authService.forgotpassword);

/* User resetpassword. */
router.put("/resetpassword", authService.resetpassword);

module.exports = router;