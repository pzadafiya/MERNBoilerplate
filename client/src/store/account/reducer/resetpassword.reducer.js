import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from '../constants';

export function resetpassword(state = {}, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { resetpasswordprocessing: true };
    case RESET_PASSWORD_SUCCESS:
      return {};
    case RESET_PASSWORD_FAILURE:
      return {};
    default:
      return state
  }
}