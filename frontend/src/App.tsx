// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/atoms/LoaderSpinner";
// routes
import PublicRoute from "./routes/PublicRoute";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

// ✅ Lazy import login
const Login = lazy(() => import("./pages/Login/Login"));

function App() {
  return (
    <AuthProvider>
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
          </Route>

          {/* Admin routes */}
          {AdminRoutes()}

          {/* User routes */}
          {UserRoutes()}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
