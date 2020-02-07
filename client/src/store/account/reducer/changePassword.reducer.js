import { CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE } from '../constants';

//This changepassword reducer function is used for handle action and return state.
export function changepassword(state = { loading: false }, action) {
    switch (action.type) {
        case CHANGE_PASSWORD_REQUEST:
            return { loading: true };
        case CHANGE_PASSWORD_SUCCESS:
            return { loading: false };
        case CHANGE_PASSWORD_FAILURE:
            return { loading: false };
        default:
            return state
    }
}