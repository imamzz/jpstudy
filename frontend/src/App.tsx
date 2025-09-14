import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store"; // pastikan path sesuai
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/atoms/LoaderSpinner";

// routes
import PublicRoute from "./routes/PublicRoute";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute restricted />}>
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Register />
                </Suspense>
              }
            />
          </Route>

          {/* Admin routes */}
          {AdminRoutes()}

          {/* User routes */}
          {UserRoutes()}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
