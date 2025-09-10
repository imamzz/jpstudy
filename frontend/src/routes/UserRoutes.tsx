// src/routes/UserRoutes.tsx
import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/atoms/LoaderSpinner";

// ✅ Lazy imports
const UserLayout = lazy(() => import("../components/layouts/UserLayout"));
const Home = lazy(() => import("../pages/user/Home/Home"));

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
