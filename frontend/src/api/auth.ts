import api from "./axios";
import { login, logout } from "../features/user/userSlice";
import { store } from "@/app/store";

export const authApi = {
  // authApi.ts
async login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    const { accessToken, user } = res.data.data;
    store.dispatch(login({ token: accessToken, user }));
    return res.data; // biar komponen bisa pakai message, dll
  },

  async register(username: string, email: string, password: string) {
    const res = await api.post("/auth/register", { username, email, password });
    const { token, user } = res.data.data;
    store.dispatch(login({ token, user }));
    return { token, user };
  },

  async logout() {
    await api.post("/auth/logout"); // backend hapus cookie
    store.dispatch(logout());
  },
};
