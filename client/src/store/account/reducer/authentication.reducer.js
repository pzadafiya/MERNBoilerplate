import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../constants';

let user = JSON.parse(sessionStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, loading: false } : { };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        loading: true,
        user: action.user
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loading: false,
        user: action.user
      };
    case LOGIN_FAILURE:
      return { loading: false };
    case LOGOUT:
      return {};
    default:
      return state
  }
}