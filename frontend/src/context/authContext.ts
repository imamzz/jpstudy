import { createContext } from "react";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  role: string | null;
  login: (token: string, role: string, user: User) => void;
  logout: () => void;
}

// Context kosong dulu, nanti diisi di AuthProvider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
