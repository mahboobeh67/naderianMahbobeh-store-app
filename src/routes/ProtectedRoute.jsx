import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  // اگر لاگین نیست:
  if (!isAuthenticated) {
    return <Navigate to={isAdminRoute ? "/admin/login" : "/login"} replace />;
  }

  // اگر نقش اشتباه باشد:
  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/"} replace />;
  }

  return children || <Outlet />;
}

