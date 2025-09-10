// src/routes/UserRoutes.tsx
import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/LoaderSpinner";

// ✅ Lazy imports
const UserLayout = lazy(() => import("../Layouts/UserLayout"));
const Home = lazy(() => import("../pages/Home"));

export default function UserRoutes() {
  return (
    <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
      <Route
        path="/home"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <UserLayout>
              <Home />
            </UserLayout>
          </Suspense>
        }
      />
    </Route>
  );
}
