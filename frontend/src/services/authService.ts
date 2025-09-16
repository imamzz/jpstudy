import api from "@/base/api";
import { login, logout } from "@/features/user/userSlice";
import { store } from "@/app/store";

export const authService = {
  async login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    const { accessToken, user } = res.data.data;
    store.dispatch(login({ token: accessToken, user }));
    return res.data; // biar komponen bisa pakai message, dll
  },

  async register(username: string, email: string, password: string) {
    const res = await api.post("/auth/register", { username, email, password });
    const { accessToken, user } = res.data.data;
    store.dispatch(login({ token: accessToken, user }));
    return { accessToken, user };
  },

  async logout() {
    await api.post("/auth/logout"); // backend hapus cookie
    store.dispatch(logout());
  },
};
