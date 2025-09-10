import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // contoh: ["admin"] atau ["user"]
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { token, role } = useAuth();

  if (!token) {
    // belum login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role || "")) {
    // role tidak diizinkan
    return role === "admin" ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/home" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
