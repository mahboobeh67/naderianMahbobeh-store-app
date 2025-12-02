import { NavLink } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

import { useAuth } from "../../context/AuthContext";

function AdminSidebar({ isCollapsed }) {
  const { logout } = useAuth();

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      {/* Header */}
      <div className={styles.logo}>
        {!isCollapsed ? "پنل مدیریت" : "⚙️"}
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <NavLink to="dashboard" className={({isActive}) => isActive ? styles.active : ""}>
          <span className={styles.icon}>📊</span>
          {!isCollapsed && <span>داشبورد</span>}
        </NavLink>

        <NavLink to="products" className={({isActive}) => isActive ? styles.active : ""}>
          <span className={styles.icon}>📦</span>
          {!isCollapsed && <span>مدیریت محصولات</span>}
        </NavLink>
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.logoutBtn} onClick={logout}>
          <span className={styles.icon}>🚪</span>
          {!isCollapsed && <span>خروج</span>}
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;

