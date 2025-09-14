import api from "./axios";
import { login, logout } from "../features/user/userSlice";
import { store } from "@/app/store";

export const authApi = {
    async login(email: string, password: string) {
        const res = await api.post("/auth/login", { email, password });
        // ambil data dari dalam res.data.data
        const { token, user } = res.data.data;
        store.dispatch(login({ token, user }));
        return { token, user };
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
