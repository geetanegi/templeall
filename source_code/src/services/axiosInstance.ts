import axios from "axios";
import { store } from "../store";
import moment from "moment";
import { refreshTokenAPI } from "./RefreshTokenService";
import { logout } from "../reducers/login/login";

const axiosInstance = axios.create({
  // baseURL: "http://10.95.4.121:9091/", // Test env
  //  baseURL: "http://10.95.4.121:8081/"    //dev env
  baseURL: "https://dev.acecamgolf.com/api/",
  // baseURL: "/api/",
});

const isSessionExpired = (): boolean => {
  const expirationTime = localStorage.getItem("expirationTime");
  if (expirationTime) {
    const now = moment();
    const expirationMoment = moment(expirationTime, "YYYY-MM-DD HH:mm:ss");
    return now.isAfter(expirationMoment); // Return true if expired
  }
  return true; // If no expiration time is set, consider it expired
};

let isRefreshing = false; // To track if a refresh call is already in progress

const refreshTokenAPICall = async () => {
  if (isRefreshing) return; // Prevent multiple refresh calls

  isRefreshing = true;
  try {
    const state = store.getState();
    const token = state?.auth?.token;
    if (token) {
      await refreshTokenAPI(); // Wait for the refresh token call to complete
    }
  } finally {
    isRefreshing = false; // Reset the flag after refresh completes
  }
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const token = state?.auth?.token; // Adjust according to your state structure

    if (isSessionExpired() && !isRefreshing) {
      await refreshTokenAPICall(); // Wait for token refresh if session is expired
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor for handling expired tokens
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const dispatch = store.dispatch;

    // If error is due to unauthorized (401) and we haven't already retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // localStorage.clear();
      // window.location.reload();
      dispatch(logout());
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
