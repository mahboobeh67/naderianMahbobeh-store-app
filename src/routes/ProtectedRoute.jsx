import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // تعیین اینکه مسیر فعلی ادمین هست یا خیر
  const isAdminRoute = useMemo(
    () => location.pathname.startsWith("/admin"),
    [location.pathname]
  );

  // -----------------------------------------
  // ۱) اگر لاگین نشده → بفرست به صفحه لاگین مناسب
  //    + مهم: مسیر قبل را در state ذخیره می‌کنیم
  // -----------------------------------------
  if (!isAuthenticated) {
    return (
      <Navigate
        to={isAdminRoute ? "/admin/login" : "/login"}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // -----------------------------------------
  // ۲) اگر نقش خواسته شده تعیین شده و کاربر مجاز نیست
  // -----------------------------------------
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    const isAllowed = allowedRoles.includes(user.role);

    if (!isAllowed) {
      return <Navigate to="/403" replace />;
    }
  }

  // -----------------------------------------
  // ۳) اگر همه چیز OK → محتوا را رندر کن
  // -----------------------------------------
  return children || <Outlet />;
}


