import { createContext } from "react";

export interface User {
  username: string;
  // Add other user properties here as needed
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
