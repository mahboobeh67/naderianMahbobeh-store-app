import { Outlet } from "react-router-dom";
import useCategories from "../../src/hooks/useCategories.js";
import { useAuthUser } from "@/hooks/useAuthUser";
import Footer from "./Footer.jsx";
import styles from "./Layout.module.css";
import Header from "./header/Header.jsx";
import Sidebar from "./Sidebar.jsx";

const Layout = () => {

  const { user } = useAuthUser();
  const {
    data: categories = [],
    isLoading,
    error,
  } = useCategories();

  return (
    <div className={styles.layout}>

  <Header
      user={user}
    
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

