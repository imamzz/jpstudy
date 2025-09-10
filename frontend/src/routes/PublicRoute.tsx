import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  restricted?: boolean; // jika true -> user login tidak boleh masuk
}

const PublicRoute = ({ restricted = true }: PublicRouteProps) => {
  const { token, role } = useAuth();

  if (restricted && token) {
    if (role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
