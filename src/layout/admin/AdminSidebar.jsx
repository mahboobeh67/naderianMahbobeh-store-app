import { NavLink } from "react-router-dom";
import styles from "./AdminSidebar.module.css";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar({ isCollapsed }) {
  const { logout } = useAuth();

  const navItemClass = ({ isActive }) =>
    `${styles.navItem} ${isActive ? styles.active : ""} ${
      isCollapsed ? styles.collapsedItem : ""
    }`;

  return (
    <aside
      className={`${styles.sidebar} ${
        isCollapsed ? styles.collapsed : styles.expanded
      }`}
    >
      {/* Logo */}
      <div className={styles.logo}>
        {!isCollapsed ? "پنل مدیریت" : "⚙️"}
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <NavLink to="dashboard" className={navItemClass}>
          <span className={styles.icon}>📊</span>
          {!isCollapsed && <span className={styles.label}>داشبورد</span>}
        </NavLink>

        <NavLink to="manage" className={navItemClass}>
          <span className={styles.icon}>📦</span>
          {!isCollapsed && <span className={styles.label}>مدیریت محصولات</span>}
        </NavLink>
      </nav>

      {/* Logout */}
      <div className={styles.footer}>
        <button className={styles.logoutBtn} onClick={logout}>
          <span className={styles.icon}>🚪</span>
          {!isCollapsed && <span className={styles.label}>خروج</span>}
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;

