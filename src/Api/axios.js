import axios from "axios";

const api = axios.create({
  baseURL: "https://api.bharatfitnessden.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // If sending FormData, let the browser/Axios
  // automatically set multipart/form-data + boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api;