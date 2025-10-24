import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/atoms/LoaderSpinner";

// ✅ Lazy imports
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));

const AdminPages = [
  { path: "/dashboard", component: lazy(() => import("../pages/admin/dashboard/Dashboard")) },
  { path: "/vocabs", component: lazy(() => import("../pages/admin/vocab/VocabPage")) },
] 

export default function AdminRoutes() {
  return (
    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      {AdminPages.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminLayout>
                <Component />
              </AdminLayout>
            </Suspense>
          }
        />
      ))}
    </Route>
  );
}
