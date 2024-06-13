import axios from "axios";
import { BASE_API } from "../shared/constants/app";
const Http = axios.create({
    baseURL: BASE_API,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        //'Content-Type': 'multipart/form-data',
    },
    maxRedirects: 0
});



Http.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
Http.interceptors.response.use(function (response) {
    response.headers["content-type"] = 'application/json'

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default Http;