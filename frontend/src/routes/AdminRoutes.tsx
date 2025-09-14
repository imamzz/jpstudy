import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/atoms/LoaderSpinner";

// ✅ Lazy imports
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));

export default function AdminRoutes() {
  return (
    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </Suspense>
        }
      />
    </Route>
  );
}
