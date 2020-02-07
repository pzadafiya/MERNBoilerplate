import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, LOGOUT } from '../constants';

let user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, loading: false } : {};

//This authentication reducer function is used for handle action and return state.
export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };

    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loading: false,
        user: action.user
      };

    case LOGIN_FAILURE:
      return {
        loading: false,
        isVerifiedUser: action.isVerifiedUser
      };

    case UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
        user: state.user
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        loggedIn: true,
        loading: false,
        user: action.user
      };

    case UPDATE_PROFILE_FAILURE:
      return {
        loading: false,
        user: state.user
      };

    case LOGOUT:
      return {};

    default:
      return state
  }
}