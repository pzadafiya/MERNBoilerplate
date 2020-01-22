import { combineReducers } from 'redux';
import { authentication } from './auth.reducer';
import { register } from './register.reducer';
import { forgotpassword } from './forgotpassword.reducer'
import { resetpassword } from './resetpassword.reducer'

const authreducer = combineReducers({
  authentication,
  register,
  forgotpassword,
  resetpassword
});

export default authreducer;