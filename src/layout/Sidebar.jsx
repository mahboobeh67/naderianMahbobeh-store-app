import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>منو</h3>

      <ul className={styles.menu}>

        <li className={styles.item}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            داشبورد
          </NavLink>
        </li>

        <li className={styles.item}>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            محصولات
          </NavLink>
        </li>

        <li className={styles.item}>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            دسته‌بندی‌ها
          </NavLink>
        </li>

        <li className={styles.item}>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            سفارش‌ها
          </NavLink>
        </li>

        <li className={styles.item}>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            تنظیمات
          </NavLink>
        </li>

      </ul>
    </aside>
  );
}

export default Sidebar;

