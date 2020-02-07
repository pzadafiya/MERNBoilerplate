import { VERIFY_ACCOUNT_REQUEST, VERIFY_ACCOUNT_SUCCESS, VERIFY_ACCOUNT_FAILURE } from '../constants';

//This verifyaccount reducer function is used for handle action and return state.
export function verifyaccount(state = { loading: false }, action) {
  switch (action.type) {
    case VERIFY_ACCOUNT_REQUEST:
      return { loading: true };
    case VERIFY_ACCOUNT_SUCCESS:
      return {
        loading: false,
        message: action.message
      };
    case VERIFY_ACCOUNT_FAILURE:
      return {
        loading: false,
        message: action.message
      };
    default:
      return state
  }
}