const express = require("../node_modules/express");

const router = express.Router({ mergeParams: true });
const authService = require("../services/auth");

/* User Registration. */
// Get /users : user list 
// Get /users/:id/ : user 
// Post /users : create new user and return new crated user object
// Put /users/:id : update user and return user object
// Delete /users/:id : Delete user and return deleted user object

router.post("/register", authService.register);

/* User Login. */
router.get("/login/:id", authService.login);

/* User ForgotPassword. */
router.post("/forgotpassword", authService.forgotpassword);
router.post("/resetpassword", authService.resetpassword);



module.exports = router;