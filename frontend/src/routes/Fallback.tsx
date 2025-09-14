import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export default function Fallback() {
  const { accessToken, role } = useAppSelector((state) => state.user);

  if (!accessToken) return <Navigate to="/login" replace />;
  if (role === "admin") return <Navigate to="/dashboard" replace />;
  if (role === "user") return <Navigate to="/home" replace />;

  return <Navigate to="/login" replace />;
}
