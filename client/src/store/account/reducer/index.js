import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { changepassword } from './changePassword.reducer';
import { forgotpassword } from './forgotPassword.reducer';
import { register } from './register.reducer';
import { resetpassword } from './resetPassword.reducer';
import { verifyaccount } from './verifyAccount.reducer';

const authreducer = combineReducers({
  authentication,
  register,
  forgotpassword,
  resetpassword,
  changepassword,
  verifyaccount
});

export default authreducer;