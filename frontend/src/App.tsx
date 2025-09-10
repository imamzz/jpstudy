import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AdminLayout from "./Layouts/AdminLayout";
import UserLayout from "./Layouts/UserLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute restricted />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path="/dashboard"
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
          </Route>

          {/* User routes */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route
              path="/home"
              element={
                <UserLayout>
                  <Home />
                </UserLayout>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
