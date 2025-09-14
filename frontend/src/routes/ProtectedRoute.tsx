import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { accessToken, role } = useAppSelector((state) => state.user);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return role === "admin" ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/home" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
