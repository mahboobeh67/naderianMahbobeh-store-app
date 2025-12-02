
import { FiShoppingCart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

import logo from "../../images/logo.jpg";
import CategoryBar from "../CategoryBar/CategoryBar";
import styles from "./Header.module.css";
import SearchBox from "./SearchBox";

function Header({ categories, cartCount, user }) {
  return (
     <div className="container">

      {/* TOP ROW */}
      <div className={styles.headerRow}>

        {/* LOGO */}
        <img src={logo} alt="logo" className={styles.logo} />

        {/* SEARCH BOX */}
        <SearchBox />

        {/* ACTIONS */}
        <div className={styles.actions}>
          
          {/* Login or User */}
          {user ? (
            <div className={styles.user}>
              <FiUser />
              <span>{user.name}</span>
            </div>
          ) : (
            <div className={styles.login}>
              <FiUser />
              <span>ورود / ثبت‌نام</span>
            </div>
          )}

          {/* CART */}
          <div className={styles.cart}>
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </div>

        </div>
      </div>

      {/* CATEGORY BAR */}
      <CategoryBar categories={categories} />

    </div>
  );
}

export default Header;