import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import { VocabProvider } from "./pages/user/vocab/store/vocabContext"; // ✅ tambahkan ini
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
    <AuthProvider>
      <VocabProvider> {/* ✅ bungkus UserRoutes */}
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
      </VocabProvider>
    </AuthProvider>
  );
}

export default App;
