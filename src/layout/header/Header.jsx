import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import logo from "../../images/logo.jpg";
import CategoryBar from "../CategoryBar/CategoryBar";
import styles from "./Header.module.css";
import SearchBox from "./SearchBox";

function Header({ categories, cartCount, user }) {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>

        <div className={styles.topRow}>

          <Link to="/" className={styles.logoWrapper}>
            <img src={logo} alt="لوگو" className={styles.logo} />
          </Link>

          <div className={styles.searchWrapper}>
            <SearchBox />
          </div>

          <div className={styles.actions}>

            {user ? (
              <Link to="/profile" className={styles.actionItem}>
                <FiUser className={styles.icon} />
                <span className={styles.text}>{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className={styles.actionItem}>
                <FiUser className={styles.icon} />
                <span className={styles.text}>ورود / ثبت‌نام</span>
              </Link>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className={`${styles.actionItem} ${styles.cart}`}>
              
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}

              <FiShoppingCart className={styles.icon} />

            </Link>

          </div>
        </div>
      </div>

      <div className={styles.categoryBar}>
        <div className="container">
          <CategoryBar categories={categories} />
        </div>
      </div>
    </header>
  );
}

export default Header;
