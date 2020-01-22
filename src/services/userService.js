import axios from 'axios';
const baseUrl = "http://localhost:3002/";

export const userService = {
	login,
	logout,
	register,
	forgotpassword,
	resetpassword
};

function login(email, password) {
	return axios({
		method: 'post',
		url: baseUrl + 'auth/login',
		data: {
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
		url: baseUrl + 'auth/register',
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
		url: baseUrl + 'auth/forgotpassword',
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
		method: 'post',
		url: baseUrl + 'auth/resetpassword',
		data: {
			token: objmodel.token,
			password:objmodel.password 
		}
	}).then((user) => {
		return user.data;
	}).catch((error) => {
		handleError(error.response)
	});

}

function handleError(response) {
	console.log(response);
	if (response.status === 401) {
		logout();
		throw "User is unauthorized";
	}

	if (response && response.status !== 200) {
		const data = response.data;
		const error = (data && data.message) || response.statusText;
		throw error;
	}
}