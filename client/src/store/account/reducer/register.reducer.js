import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../constants';

export function register(state = { loading: false }, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false };
    case REGISTER_FAILURE:
      return { loading: false };
    default:
      return state
  }
}