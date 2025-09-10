import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type User } from "./authContext";
import api from "../api/axios"; // pakai axios instance kamu

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  // ✅ saat pertama kali load, ambil ulang profile dari server
  useEffect(() => {
    if (token) {
      api
        .get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
          // Simpan juga ke localStorage biar konsisten
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch(() => {
          // kalau token invalid → logout
          logout();
        });
    }
  }, [token]); // jalan saat pertama kali, atau saat token berubah

  const login = (token: string, role: string, user?: User) => {
    setToken(token);
    setRole(role);
    setUser(user || null);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
