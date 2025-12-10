
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
      isActive ? styles.active : undefined
    }
  >
    داشبورد
  </NavLink>
</li>
        <li className={styles.item}>محصولات</li>
        <li className={styles.item}>دسته‌بندی‌ها</li>
        <li className={styles.item}>سفارش‌ها</li>
        <li className={styles.item}>تنظیمات</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
