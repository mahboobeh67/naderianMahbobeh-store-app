import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <Header />

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
