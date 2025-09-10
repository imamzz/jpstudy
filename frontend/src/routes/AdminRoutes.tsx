// src/routes/AdminRoutes.tsx
import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/LoaderSpinner";

// ✅ Lazy imports
const AdminLayout = lazy(() => import("../Layouts/AdminLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

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
