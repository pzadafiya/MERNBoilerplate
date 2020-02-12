import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from '../constants';

//This resetpassword reducer function is used for handle action and return state.
export function resetpassword(state = { loading: false }, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false };
    case RESET_PASSWORD_FAILURE:
      return { loading: false };
    default:
      return state
  }
}