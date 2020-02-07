import { FORGOT_PASSWORD_REQUEST, LOGIN_REQUEST, LOGOUT, REGISTER_REQUEST, RESET_PASSWORD_REQUEST, UPDATE_PROFILE_REQUEST, CHANGE_PASSWORD_REQUEST, VERIFY_ACCOUNT_REQUEST, RESEND_VERIFICATION_LINK_REQUEST } from './constants';

// This is the function that run when login action call from component
export const login = (email, password, history) => {
	return {
		type: LOGIN_REQUEST,
		payload: { email, password, history }
	}
}

// This is the function that run when logout action call from component
export const logout = (history) => {
	return {
		type: LOGOUT,
		payload: { history }
	}
}

// This is the function that run when register action call from component
export const register = (user, history) => {
	return {
		type: REGISTER_REQUEST,
		payload: { user, history }
	}
}

// This is the function that run when forgotpassword action call from component
export const forgotpassword = (email, history) => {
	return {
		type: FORGOT_PASSWORD_REQUEST,
		payload: { email, history }
	}
}

// This is the function that run when resetpassword action call from component
export const resetpassword = (token,password, history) => {
	return {
		type: RESET_PASSWORD_REQUEST,
		payload: { token,password, history }
	}
}

// This is the function that run when updateprofile action call from component
export const updateprofile = (user, history) => {
	return {
		type: UPDATE_PROFILE_REQUEST,
		payload: { user, history }
	}
}

// This is the function that run when changepassword action call from component
export const changepassword = (user, history) => {
	return {
		type: CHANGE_PASSWORD_REQUEST,
		payload: { user, history }
	}
}

// This is the function that run when verifyaccount action call from component
export const verifyaccount = (token, history) => {
	return {
		type: VERIFY_ACCOUNT_REQUEST,
		payload: { token, history }
	}
}

// This is the function that run when resendverificationlink action call from component
export const resendverificationlink = (email) => {
	return {
		type: RESEND_VERIFICATION_LINK_REQUEST,
		payload: { email }
	}
}

