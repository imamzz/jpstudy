import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { store } from "@/app/store";
import { login, logout } from "@/features/user/userSlice";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // penting agar cookie HttpOnly ikut terkirim
});

// ============================================================
// REQUEST INTERCEPTOR → tambah Authorization header kalau ada token
// ============================================================
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().user.accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================================
// RESPONSE INTERCEPTOR → handle 401 + refresh token
// ============================================================

// Flag & queue supaya tidak refresh berkali-kali
let isRefreshing = false;
type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (err: unknown) => void;
};
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // kalau bukan 401 → langsung lempar
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 🚨 JANGAN refresh token di login/register
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    // 🚨 Kalau user belum login → langsung lempar
    const state = store.getState();
    if (!state.user.accessToken) {
      return Promise.reject(error);
    }


    originalRequest._retry = true;

  }
);

export default api;
