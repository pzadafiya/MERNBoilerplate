import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { axiosGet, axiosPost, axiosPut } from '../../helpers/apiUtils';
import { alertActions } from '../alert/actions';
import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, VERIFY_ACCOUNT_REQUEST, VERIFY_ACCOUNT_SUCCESS, VERIFY_ACCOUNT_FAILURE, RESEND_VERIFICATION_LINK_REQUEST, RESEND_VERIFICATION_LINK_SUCCESS, RESEND_VERIFICATION_LINK_FAILURE } from './constants';

// This is the function which call login api via axios,
// if response status is 200 then store response data in session and redux store and redirect to home page.
// else display alert with error message.
function* loginUser({ payload: { email, password, history } }) {
    try {
        const params = {
            email: email,
            password: password
        }
        const response = yield call(axiosGet, 'login', params);
        if (response.status === 200 && response.statusText === "OK") {
            // handle success
            //store data in sessionStorage
            sessionStorage.setItem('user', JSON.stringify(response.data));
            yield put({ type: LOGIN_SUCCESS, user: response.data });
            history.push('/');
        }
    } catch (e) {
        // handle error
        if (e.response.status !== 200) {
            const data = e.response.data;
            yield put({ type: LOGIN_FAILURE, isVerifiedUser: data.isVerifiedUser });
            yield put(alertActions.showNotification("error", data.message, 3000));
            yield put(alertActions.removeNotification());
        }
    }
}

// This is the function which remove user data from sessionStorage.
function* logoutUser({ payload: { history } }) {
    yield sessionStorage.removeItem('user');
    history.push('/');
}

// This is the function which call register api via axios,
// if response status is 200 then display success message.
// else display alert with error message.
function* registerUser({ payload: { user, history } }) {
    try {
        const params = {
            email: user.email,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            phonenumber: user.phonenumber
        }

        const response = yield call(axiosPost, 'register', params);

        if (response.status === 200 && response.statusText === "OK") {
            // handle success
            yield put({ type: REGISTER_SUCCESS });
            yield put(alertActions.showNotification("success", response.data, 3000));
            yield put(alertActions.removeNotification());
            history.push('/');
        }
    } catch (e) {
        // handle error
        if (e.response.status !== 200) {
            const data = e.response.data;
            yield put({ type: REGISTER_FAILURE });
            yield put(alertActions.showNotification("error", data.message, 3000));
            yield put(alertActions.removeNotification());
        }
    }
}

// This is the function which call forgotpassword api via axios,
// if response status is 200 then display success message.
// else display alert with error message.
function* forgotpasswordUser({ payload: { email, history } }) {
    try {
        const params = {
            email: email
        }
        const response = yield call(axiosPost, 'forgotpassword', params);

        if (response.status === 200 && response.statusText === "OK") {
            // handle success
            yield put({ type: FORGOT_PASSWORD_SUCCESS });
            yield put(alertActions.showNotification("success", response.data, 3000));
            yield put(alertActions.removeNotification());
            history.push('/');
        }
    } catch (e) {
        // handle error
        if (e.response.status !== 200) {
            const data = e.response.data;
            yield put({ type: FORGOT_PASSWORD_FAILURE });
            yield put(alertActions.showNotification("error", data.message, 3000));
            yield put(alertActions.removeNotification());
        }
    }
}

// This is the function which call reset password api via axios,
// if response status is 200 then display success message.
// else display alert with error message.
function* resetpasswordUser({ payload: { token, password, history } }) {
    try {
        const params = {
            token: token,
            password: password
        };
        console.log(params)
        const response = yield call(axiosPut, 'resetpassword', params);
        if (response.status === 200 && response.statusText === "OK") {
            // handle success
            yield put({ type: RESET_PASSWORD_SUCCESS });
            yield put(alertActions.showNotification("success", response.data, 3000));
            yield put(alertActions.removeNotification());
            history.push('/');
        }
    } catch (e) {
        // handle error
        if (e.response.status !== 200) {
            const data = e.response.data;
            yield put({ type: RESET_PASSWORD_FAILURE });
            yield put(alertActions.showNotification("error", data.message, 3000));
            yield put(alertActions.removeNotification());
        }
    }
}

// This is the function which call update Profile api via axios,
// if response status is 200 then display success message and update resonse data to redux store as well sessionStorage.
// else display alert with error message.
function* updateProfileUser({ payload: { user, history } }) {
    try {
        const params = {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phonenumber: user.phonenumber
        };
        const response = yield call(axiosPut, 'updateprofile', params);

        if (response.status === 200 && response.statusText === "OK") {
            // handle success
            //store data in sessionStorage
            sessionStorage.setItem('user', JSON.stringify(response.data));
            yield put({ type: UPDATE_PROFILE_SUCCESS, user: response.data });
            yield put(alertActions.showNotification("success", "Profile updated successfully", 3000));

            yield put(alertActions.removeNotification());
        }
    } catch (e) {
        // handle error
        if (e.response.status !== 200) {
            const data = e.response.data;
            yield put({ type: UPDATE_PROFILE_FAILURE });
            yield put(alertActions.showNotification("error", data.message, 3000));
            yield put(alertActions.removeNotification());
        }
    }
}

// This is the function which call change Password api via axios,
// if response status is 200 then display success message.
// else display alert with error message.
function* changePasswordUser({ payload: { user, history } }) {
    try {
        const params = {
            email: user.email,
            currentpassword: user.currentpassword,
            newpassword: user.newpassword
        };
        const response = yield call(axiosPut, 'changepassword', params);

        if (response.status === 200 && response.statusText === "OK") {
            // handle success
            yield put({ type: CHANGE_PASSWORD_SUCCESS });
            yield put(alertActions.showNotification("success", response.data, 3000));
            yield put(alertActions.removeNotification());
            history.push('/');
        }
    } catch (e) {
        // handle error
        if (e.response.status !== 200) {
            const data = e.response.data;
            yield put({ type: CHANGE_PASSWORD_FAILURE, message: data });
            yield put(alertActions.showNotification("error", data.message, 3000));
            yield put(alertActions.removeNotification());
        }
    }
}

// This is the function which call verifyAccount api via axios,
// if response status is 200 then display success message.
// else display alert with error message.
function* verifyAccount({ payload: { token } }) {
    try {
        const params = {
            token: token
        };
        const response = yield call(axiosPut, 'verifyaccount', params);

        if (response.status === 200 && response.statusText === "OK") {
            // handle success
            yield put({ type: VERIFY_ACCOUNT_SUCCESS, message: response.data });
        }
    } catch (e) {
        // handle error
        if (e.response.status !== 200) {
            const data = e.response.data;
            yield put({ type: VERIFY_ACCOUNT_FAILURE, message: data });
            yield put(alertActions.showNotification("error", data.message, 3000));
            yield put(alertActions.removeNotification());
        }
    }
}

// This is the function which call Re-Send Verification link api via axios,
// if response status is 200 then display success message and store message in redux store.
// else display alert with error message.
function* reSendVerificationLink({ payload: { email } }) {
    try {
        const params = {
            email: email
        };
        const response = yield call(axiosPut, 'resendverificationlink', params);

        if (response.status === 200 && response.statusText === "OK") {
            // handle success
            yield put({ type: RESEND_VERIFICATION_LINK_SUCCESS, message: response.data });
            yield put(alertActions.showNotification("success", response.data, 3000));
            yield put(alertActions.removeNotification());
        }
    } catch (e) {
        // handle error
        if (e.response.status !== 200) {
            const data = e.response.data;
            yield put({ type: RESEND_VERIFICATION_LINK_FAILURE, message: data });
            yield put(alertActions.showNotification("error", data.message, 3000));
            yield put(alertActions.removeNotification());
        }
    }
}

//This is the function that continuously watch LOGIN_REQUEST action when LOGIN_REQUEST action call this function call loginUser function.
export function* watchLoginUser() {
    yield takeLatest(LOGIN_REQUEST, loginUser);
}

//This is the function that continuously watch LOGOUT action when LOGOUT action call this function call logoutUser function.
export function* watchLogout() {
    yield takeEvery(LOGOUT, logoutUser);
}

//This is the function that continuously watch REGISTER_REQUEST action when REGISTER_REQUEST action call this function call registerUser function.
export function* watchRegisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser);
}

//This is the function that continuously watch FORGOT_PASSWORD_REQUEST action when FORGOT_PASSWORD_REQUEST action call this function call forgotpasswordUser function.
export function* watchForgotpassword() {
    yield takeEvery(FORGOT_PASSWORD_REQUEST, forgotpasswordUser)
}

//This is the function that continuously watch RESET_PASSWORD_REQUEST action when RESET_PASSWORD_REQUEST action call this function call resetpasswordUser function.
export function* watchResetpassword() {
    yield takeEvery(RESET_PASSWORD_REQUEST, resetpasswordUser)
}

//This is the function that continuously watch UPDATE_PROFILE_REQUEST action when UPDATE_PROFILE_REQUEST action call this function call updateProfileUser function.
export function* watchUpdateProfile() {
    yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfileUser)
}

//This is the function that continuously watch CHANGE_PASSWORD_REQUEST action when CHANGE_PASSWORD_REQUEST action call this function call changePasswordUser function.
export function* watchChangePassword() {
    yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordUser)
}

//This is the function that continuously watch VERIFY_ACCOUNT_REQUEST action when VERIFY_ACCOUNT_REQUEST action call this function call verifyAccount function.
export function* watchVerifyAccount() {
    yield takeEvery(VERIFY_ACCOUNT_REQUEST, verifyAccount)
}

//This is the function that continuously watch RESEND_VERIFICATION_LINK_REQUEST action when RESEND_VERIFICATION_LINK_REQUEST action call this function call reSendVerificationLink function.
export function* watchReSendVerificationLink() {
    yield takeEvery(RESEND_VERIFICATION_LINK_REQUEST, reSendVerificationLink)
}


function* authenticationSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchRegisterUser),
        fork(watchForgotpassword),
        fork(watchResetpassword),
        fork(watchUpdateProfile),
        fork(watchChangePassword),
        fork(watchVerifyAccount),
        fork(watchReSendVerificationLink)
    ]);
}

export default authenticationSaga;
