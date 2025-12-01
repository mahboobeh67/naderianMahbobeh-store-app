import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.wrapper}>
      <AdminSidebar isCollapsed={isCollapsed} />

      <div className={styles.mainArea}>
        <AdminHeader
          toggleSidebar={() => setIsCollapsed((prev) => !prev)}
        />

        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

