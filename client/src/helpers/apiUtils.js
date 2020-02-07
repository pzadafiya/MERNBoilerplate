import axios from 'axios';
import baseUrl from './config';

// This is the function that Send a GET request
export function axiosGet(path, params) {
    return axios({
        method: 'get', // `method` is the request method to be used when making the request
        url: baseUrl + path,// `url` is the server URL that will be used for the request
        params: params // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
    });
}

// This is the function that Send a POST request
export function axiosPost(path, params) {
    return axios({
        method: 'post',// `method` is the request method to be used when making the request
        url: baseUrl + path, // `url` is the server URL that will be used for the request
        data: params // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
    });
}

// This is the function that Send a POST request with header
export function axiosPostWithFormData(path, params) {
    return axios({
        method: 'post', // `method` is the request method to be used when making the request
        url: baseUrl + path, // `url` is the server URL that will be used for the request
        data: params, // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
        headers: {
            'content-type': 'multipart/form-data'
        } // `headers` the headers that the server responded with, All header names are lower cased
    });
}

// This is the function that Send a PUT request.
export function axiosPut(path, params) {
    return axios({
        method: 'put', // `method` is the request method to be used when making the request
        url: baseUrl + path, // `url` is the server URL that will be used for the request
        data: params // `data` are the URL parameters to be sent with the request, Must be a plain object or a URLSearchParams object
    });
}