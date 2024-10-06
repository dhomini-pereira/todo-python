"use client";

import axios from "axios";

const api = axios.create({
  baseURL: "/",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/signin";
    }

    if (error.response && error.response.status >= 500) {
      error.response.data.error = "Internal Server Error";
    }

    return Promise.reject(error);
  }
);

export default api;
