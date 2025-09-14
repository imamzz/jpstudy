import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

const PublicRoute = ({ restricted = true }) => {
  const { accessToken, role } = useAppSelector((state) => state.user);

  if (restricted && accessToken) {
    return role === "admin" ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/home" replace />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
