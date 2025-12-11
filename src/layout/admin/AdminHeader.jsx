import { Link } from "react-router-dom";
import styles from "./AdminHeader.module.css";

function AdminHeader({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      {/* Sidebar Toggle */}
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        ☰
      </button>

      <div className={styles.rightSide}>
        {/* Back To Shop */}
        <Link to="/" className={styles.backToShop}>
          بازگشت به فروشگاه 🛒
        </Link>

        {/* Notifications */}
        <button className={styles.iconBtn} title="اعلان‌ها">
          🔔
        </button>

        {/* Profile */}
        <Link to="/profile" className={styles.iconBtn} title="پروفایل">
          👤
        </Link>

        {/* Logout */}
        <Link to="/admin/login" className={styles.logoutBtn}>
          خروج
        </Link>
      </div>
    </header>
  );
}

export default AdminHeader;


