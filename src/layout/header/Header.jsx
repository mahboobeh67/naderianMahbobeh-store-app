import { Link } from "react-router-dom"; // برای لینک‌های قابل کلیک
import { FiShoppingCart, FiUser } from "react-icons/fi"; // آیکون‌های شیک

import logo from "../../images/logo.jpg"; // لوگوی خوشگل‌مون
import CategoryBar from "../CategoryBar/CategoryBar"; // CategoryBar که قبلاً ارتقا دادیم
import styles from "./Header.module.css"; // CSS Module اختصاصی header
import SearchBox from "./SearchBox"; // کامپوننت SearchBox

function Header({ categories, cartCount, user }) {
  return (
    <header className={styles.mainHeader}> {/* یک header تگ semantic */}
      <div className={`${styles.container} container`}> {/* استفاده از کلاس container برای محدود کردن عرض */}

        {/* TOP ROW: لوگو، سرچ، اکشن‌ها */}
        <div className={styles.headerRow}>

          {/* LOGO */}
          <Link to="/" className={styles.logoWrapper}> {/* لوگو باید لینک باشه به صفحه اصلی */}
            <img src={logo} alt="لوگو فروشگاه" className={styles.logo} />
          </Link>

          {/* SEARCH BOX */}
          <div className={styles.searchBoxWrapper}> {/* SearchBox رو هم داخل یه wrapper میذاریم برای کنترل بهتر */}
            <SearchBox />
          </div>

          {/* ACTIONS: ورود/کاربر و سبد خرید */}
          <div className={styles.actions}>
            
            {/* Login or User */}
            {user ? (
              <Link to="/profile" className={styles.actionItem}> {/* اگر کاربر لاگین بود به صفحه پروفایل بره */}
                <FiUser className={styles.actionIcon} />
                <span className={styles.actionText}>{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className={styles.actionItem}> {/* اگر لاگین نبود به صفحه ورود/ثبت‌نام بره */}
                <FiUser className={styles.actionIcon} />
                <span className={styles.actionText}>ورود / ثبت‌نام</span>
              </Link>
            )}

            {/* CART */}
            <Link to="/cart" className={`${styles.actionItem} ${styles.cart}`}> {/* سبد خرید */}
              <FiShoppingCart className={styles.actionIcon} />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
              <span className={styles.actionText}>سبد خرید</span> {/* اضافه کردن متن "سبد خرید" برای وضوح بیشتر */}
            </Link>

          </div>
        </div>
      </div>

      {/* CATEGORY BAR: در پایین headerRow اما هنوز چسبیده به header اصلی */}
      <div className={styles.categoryBarWrapper}>
        <div className="container"> {/* CategoryBar هم داخل container باشه */}
          <CategoryBar categories={categories} />
        </div>
      </div>

    </header>
  );
}

export default Header;
