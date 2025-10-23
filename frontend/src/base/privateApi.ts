// src/base/privateApi.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { store } from "@/app/store";
import { login, logout } from "@/features/profile/userSlice";
import api from "./api"; // import public axios buat refresh

const privateApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Tambahkan Authorization header
privateApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().user.accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired token
privateApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Kalau bukan 401 atau request sudah di-retry → lempar error
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Refresh token
      const res = await api.post("/auth/refresh");
      const { token, user } = (res.data as any).data;

      // Update redux
      store.dispatch(login({ token, user }));

      // Set token baru
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }

      return privateApi(originalRequest);
    } catch (err) {
      store.dispatch(logout());
      return Promise.reject(err);
    }
  }
);

export default privateApi;
