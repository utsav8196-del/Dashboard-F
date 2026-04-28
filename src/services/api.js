import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const saved = JSON.parse(localStorage.getItem("ecomm-auth") || "{}");

  if (saved.token) {
    config.headers.Authorization = `Bearer ${saved.token}`;
  }

  return config;
});

export default api;
