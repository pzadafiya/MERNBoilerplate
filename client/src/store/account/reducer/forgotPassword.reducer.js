import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from '../constants';

//This forgotpassword reducer function is used for handle action and return state.
export function forgotpassword(state = { loading: false }, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false };
    case FORGOT_PASSWORD_FAILURE:
      return { loading: false };
    default:
      return state
  }
}