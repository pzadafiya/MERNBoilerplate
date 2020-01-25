import axios from 'axios';
import baseUrl from '../helpers/utils';

export const userService = {
	login,
	logout,
	register,
	forgotpassword,
	resetpassword
};

function login(email, password) {
	return axios({
		method: 'get',
		url: baseUrl + 'login',
		params: {
			email: email,
			password: password
		}
	}).then((user) => {
		// store user details and jwt token in local storage to keep user logged in between page refreshes
		localStorage.setItem('user', JSON.stringify(user.data));
		return user.data;
	}).catch((error) => {
		handleError(error.response)
	});
}

// remove user from local storage to log user out
function logout() {
	localStorage.removeItem('user');
}

// register user request
function register(user) {

	return axios({
		method: 'post',
		url: baseUrl + 'register',
		data: {
			user: user
		}
	}).then((user) => {
		return user.data
	}).catch((error) => {
		handleError(error.response)
	});
}

function forgotpassword(email) {

	return axios({
		method: 'post',
		url: baseUrl + 'forgotpassword',
		data: {
			email: email
		}
	}).then((user) => {
		return user.data;
	}).catch((error) => {
		handleError(error.response)
	});
}

function resetpassword(objmodel) {
	return axios({
		method: 'put',
		url: baseUrl + 'resetpassword',
		data: {
			token: objmodel.token,
			password: objmodel.password
		}
	}).then((user) => {
		return user.data;
	}).catch((error) => {
		handleError(error.response)
	});

}

function handleError(response) {
	
	if (response.status === 401) {
		logout();
		throw new Error("User is unauthorized")
	}

	if (response && response.status !== 200) {
		const data = response.data;
		const error = (data && data.message) || response.statusText;
		throw error;
	}
}