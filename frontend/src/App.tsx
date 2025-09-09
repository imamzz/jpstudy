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

function PrivateRoute({ children, allowed }: { children: JSX.Element; allowed: string[] }) {
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
          <Route path="/login" element={<Login />} />

          {/* user biasa */}
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

          {/* admin */}
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
