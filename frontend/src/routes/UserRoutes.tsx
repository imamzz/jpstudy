// src/routes/UserRoutes.tsx
import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/atoms/LoaderSpinner";

const UserLayout = lazy(() => import("../components/layouts/UserLayout"));
const Home = lazy(() => import("../pages/user/Home/Home"));
const VocabList = lazy(() => import("../pages/user/Vocab/VocabList"));
const VocabDetail = lazy(() => import("../pages/user/Vocab/VocabDetail"));
// const VocabStudy = lazy(() => import("../pages/user/Vocab/VocabStudy"));

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
      <Route
        path="/vocab"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <UserLayout>
              <VocabList />
            </UserLayout>
          </Suspense>
        }
      />
      <Route
        path="/user/vocab/:id"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <UserLayout>
              <VocabDetail />
            </UserLayout>
          </Suspense>
        }
      />
      {/* <Route
        path="/user/vocab/study"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <UserLayout>
              <VocabStudy />
            </UserLayout>
          </Suspense>
        }
      /> */}
    </Route>
  );
}
