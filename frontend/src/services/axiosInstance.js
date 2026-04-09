import axios from "axios";
import { storage } from "@utils/storage";
import { API_URL } from "@lib/constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR — attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR — handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong";

    if (status === 401) {
      storage.remove("token");
      storage.remove("user");
      window.location.href = "/login";
    }

    if (status === 403) {
      console.error("Forbidden — you don't have permission");
    }

    if (status >= 500) {
      console.error("Server error — try again later");
    }

    return Promise.reject({ status, message });
  },
);

export default axiosInstance;
