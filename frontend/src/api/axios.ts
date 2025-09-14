import axios from "axios";
import { store } from "@/app/store";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ganti sesuai backend Anda
  withCredentials: true, // penting! supaya cookie HttpOnly ikut terkirim
});

// Interceptor untuk inject Authorization
api.interceptors.request.use((config) => {
  const token = store.getState().user.accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
