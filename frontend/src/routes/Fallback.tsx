import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Fallback() {
  const { role, token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (role === "admin") return <Navigate to="/dashboard" replace />;
  if (role === "user") return <Navigate to="/home" replace />;

  return <Navigate to="/login" replace />;
}
