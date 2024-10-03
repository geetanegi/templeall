import axios from "axios";
import { store } from "../store";

const axiosInstance = axios.create({
  // baseURL: "http://10.95.4.121:9091/", // Test env
  //  baseURL: "http://10.95.4.121:8081/"    //dev env
   baseURL: "/api/"
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.auth?.token; // Adjust according to your state structure

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
