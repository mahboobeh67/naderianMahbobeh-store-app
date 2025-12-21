import { Outlet } from "react-router-dom";
import useCategories from "../../src/hooks/useCategories.js";

import Footer from "./Footer.jsx";
import styles from "./Layout.module.css";
import Header from "./header/Header.jsx";
import Sidebar from "./Sidebar.jsx";

const Layout = () => {


  const {
    data: categories = [],
    isLoading,
    error,
  } = useCategories();

  return (
    <div className={styles.layout}>

  <Header
      
    
        categories={categories}
        cartCount={2}

        isCategoriesLoading={isLoading}
        categoriesError={error}
      />

      <main className={styles.mainWrapper}>
        <div className={styles.container}>
          <Outlet />
        </div>
        <Sidebar />
      </main>

      <Footer />

    </div>
    
   
  );
};

export default Layout;

