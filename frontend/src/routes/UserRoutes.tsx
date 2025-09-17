import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/atoms/LoaderSpinner";

const UserLayout = lazy(() => import("../layouts/UserLayout"));

// Daftar routes user
const userPages = [
  { path: "/home", component: lazy(() => import("../pages/user/home/HomePage")) },
  { path: "/vocab", component: lazy(() => import("../pages/user/vocab/VocabPage")) },
  { path: "/vocab/study", component: lazy(() => import("../pages/user/vocab/VocabStudy")) },
  { path: "/grammar", component: lazy(() => import("../pages/user/grammar/GrammarPage")) },
  { path: "/grammar/study", component: lazy(() => import("../pages/user/grammar/GrammarStudy")) },
  { path: "/grammar/exercise", component: lazy(() => import("../pages/user/grammar/ExercisePage")) },
  { path: "/kanji", component: lazy(() => import("../pages/user/kanji/KanjiPage")) },
  { path: "/kanji/:id", component: lazy(() => import("../pages/user/kanji/KanjiDetail")) },
  { path: "/kanji/study", component: lazy(() => import("../pages/user/kanji/KanjiStudy")) },
  { path: "/kanji/exercise", component: lazy(() => import("../pages/user/kanji/KanjiExercise")) },
  { path: "/review", component: lazy(() => import("../pages/user/review/ReviewPage")) },
  { path: "/review/study", component: lazy(() => import("../pages/user/review/ReviewStudy")) },
  { path: "/profile", component: lazy(() => import("../pages/user/profile/ProfilePage")) },
];

export default function UserRoutes() {
  return (
    <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
      {userPages.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <UserLayout>
                <Component />
              </UserLayout>
            </Suspense>
          }
        />
      ))}
    </Route>
  );
}
