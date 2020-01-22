import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from '../constants';

export function forgotpassword(state = {}, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { forgotpasswording: true };
    case FORGOT_PASSWORD_SUCCESS:
      return {};
    case FORGOT_PASSWORD_FAILURE:
      return {};
    default:
      return state
  }
}