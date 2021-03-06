import axios from 'axios';
import { config } from './config';
import { authHeader } from './authHeader';

// This is the function that Send a GET request
export function axiosGet(path, params) {
    return axios({
        method: 'get', // `method` is the request method to be used when making the request
        url: config.baseUrl + path,// `url` is the server URL that will be used for the request
        params: params // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
    });
}

// This is the function that Send a POST request
export function axiosPost(path, params) {
    return axios({
        method: 'post',// `method` is the request method to be used when making the request
        url: config.baseUrl + path, // `url` is the server URL that will be used for the request
        data: params // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
    });
}

// This is the function that Send a PUT request.
export function axiosPut(path, params) {
    return axios({
        method: 'put', // `method` is the request method to be used when making the request
        url: config.baseUrl + path, // `url` is the server URL that will be used for the request
        data: params // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
    });
}

// This is the function that Send a GET request
export function axiosGetWithAuthHeader(path, params) {
    return axios({
        method: 'get', // `method` is the request method to be used when making the request
        url: config.baseUrl + path,// `url` is the server URL that will be used for the request
        params: params, // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
        headers: authHeader()
    }).catch(err => {
        handleUnAuthorizeUser(err);
    });
}

// This is the function that Send a GET request
export function axiosPostWithAuthHeader(path, params, isMultipartForm = false) {
    return axios({
        method: 'post', // `method` is the request method to be used when making the request
        url: config.baseUrl + path,// `url` is the server URL that will be used for the request
        data: params, // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
        headers: authHeader(isMultipartForm)
    }).catch(err => {
        handleUnAuthorizeUser(err);
    });
}

// This is the function that Send a GET request
export function axiosPutWithAuthHeader(path, params) {
    return axios({
        method: 'put', // `method` is the request method to be used when making the request
        url: config.baseUrl + path,// `url` is the server URL that will be used for the request
        data: params, // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
        headers: authHeader()
    }).catch(err => {
        handleUnAuthorizeUser(err);
    });
}

// This is the function which handle un-authorize user.
function handleUnAuthorizeUser(err) {
    const data = err.response.data;
    if (data && data.message === "jwt expired") {
        sessionStorage.removeItem('user');
        window.location.reload();
    }
    else throw err;
}