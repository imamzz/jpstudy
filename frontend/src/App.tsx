import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import type { JSX } from "react";
import { useAuth } from "./hooks/useAuth";

// layouts
import AdminLayout from "./Layouts/AdminLayout";
import UserLayout from "./Layouts/UserLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function PrivateRoute({
  children,
  allowed,
}: {
  children: JSX.Element;
  allowed: string[];
}) {
  const { token, role } = useAuth();
  if (!token) return <Navigate to="/login" />;
  if (!allowed.includes(role || "")) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute restricted={true} />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected for admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute allowed={["admin"]}>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </PrivateRoute>
              }
            />
          </Route>

          {/* Protected for user */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route
              path="/home"
              element={
                <PrivateRoute allowed={["user"]}>
                  <UserLayout>
                    <Home />
                  </UserLayout>
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
