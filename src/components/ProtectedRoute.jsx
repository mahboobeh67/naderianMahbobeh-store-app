import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./ProtectedRoute.module.css";

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Loading state — show skeleton loader
  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner}></div>
        <p>در حال بررسی ورود...</p>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // If roles are defined → check role access
  if (roles && !roles.includes(user?.role)) {
    return (
      <div className={styles.deniedBox}>
        <h2>دسترسی غیرمجاز</h2>
        <p>شما اجازهٔ ورود به این بخش را ندارید.</p>
      </div>
    );
  }

  // Access granted → render children
  return children;
}
