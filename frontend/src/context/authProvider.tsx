import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
  
    try {
      const parsed = JSON.parse(userData);
      if (typeof parsed === "object" && parsed !== null) {
        return parsed;
      }
      return null; // kalau bukan object, abaikan
    } catch (e) {
      console.error("Invalid user data in localStorage:", e, "raw:", userData);
      localStorage.removeItem("user"); // bersihkan biar gak error lagi
      return null;
    }
  });
  

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
