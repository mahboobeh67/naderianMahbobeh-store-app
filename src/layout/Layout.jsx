import { Outlet } from "react-router-dom";
import useCategories from "../../src/hooks/useCategories.js";

import Footer from "./Footer.jsx";
import styles from "./Layout.module.css";
import Header from "./header/Header.jsx";

const Layout = () => {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useCategories();

  return (
    <>
      <Header
        categories={categories}
        cartCount={2}
        user={null}
        isCategoriesLoading={isLoading}
        categoriesError={error}
      />

      <main className={styles.mainWrapper}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Layout;

