import axios from "axios";
import { url } from "../constants/action-url";
import {Token} from "./tokenApi";

// Create instance
const api = axios.create({
  baseURL: url.baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

// Set the Configs for any request
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

api.interceptors.response.use((response) => {
  return response
}, function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    //console.log("Trying to get new token");
    originalRequest._retry = true;
    let token = localStorage.getItem("refreshToken");
    return api.post(url.TOKEN,{ token })
    .then((response) => {
      //console.log("New Token -> " +  response.data.token);
      localStorage.setItem("accessToken",response.data.token);
      api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      return api(originalRequest);
    })
  }
  return Promise.reject(error);
});

function ErrorHandler(error) {
  if (error.response && error.response.data) throw error.response.data;
  else throw error;
}

export {api, ErrorHandler}