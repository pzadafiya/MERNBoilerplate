import { userService } from '../../services/userService';
import { alertActions } from '../alert/actions';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILURE,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE
} from './constants';

export const login = (email, password, history) => {

	return dispatch => {
		dispatch({ type: LOGIN_REQUEST, email });

		userService.login(email, password)
			.then(
				user => {
					dispatch({ type: LOGIN_SUCCESS, user });
					dispatch(alertActions.removeNotification());
					history.push('/');
				},
				error => {
					dispatch({ type: LOGIN_FAILURE, error });
					dispatch(alertActions.showNotification("error", error, 3000));
					dispatch(alertActions.removeNotification());
				}
			);
	};
}

export const logout = () => {
	userService.logout();
	return { type: LOGOUT };
}

export const register = (user) => {
	return dispatch => {
		dispatch({ type: REGISTER_REQUEST, user });
		
		userService.register(user)
			.then(
				user => {
					debugger
					dispatch({ type: REGISTER_SUCCESS });
					dispatch(alertActions.showNotification("success", user.message, 3000));
					dispatch(alertActions.removeNotification());
				},
				error => {
					dispatch({ type: REGISTER_FAILURE, error });
					dispatch(alertActions.showNotification("error", error, 3000));
					dispatch(alertActions.removeNotification());
				}
			);
	};
}

export const forgotpassword = (email) => {
	return dispatch => {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST,
			email
		});

		userService.forgotpassword(email)
			.then(
				user => {
					dispatch({ type: FORGOT_PASSWORD_SUCCESS, user });
					dispatch(alertActions.showNotification("success", user.message, 3000));
					dispatch(alertActions.removeNotification());
				},
				error => {
					dispatch({ type: FORGOT_PASSWORD_FAILURE, error });
					dispatch(alertActions.showNotification("error", error, 3000));
					dispatch(alertActions.removeNotification());
				}
			);
	};
}

export const resetpassword = (objmodel, history) => {

	return dispatch => {
		dispatch({ type: RESET_PASSWORD_REQUEST, objmodel });

		userService.resetpassword(objmodel)
			.then(
				data => {
					dispatch({ type: RESET_PASSWORD_SUCCESS, data });
					dispatch(alertActions.showNotification("success", data.message, 3000));
					dispatch(alertActions.removeNotification());
				},
				error => {
					dispatch({ type: RESET_PASSWORD_FAILURE, error });
					dispatch(alertActions.showNotification("error", error, 3000));
					dispatch(alertActions.removeNotification());
				}
			);
	};
}