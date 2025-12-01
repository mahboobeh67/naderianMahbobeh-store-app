import { Link } from "react-router-dom";
import styles from "./AdminHeader.module.css";

function AdminHeader({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <button className={styles.toggleBtn} onClick={toggleSidebar}>☰</button>

      <div className={styles.rightSide}>
        <Link to="/" className={styles.backToShop}>بازگشت به فروشگاه 🛒</Link>
      </div>
    </header>
  );
}

export default AdminHeader;

