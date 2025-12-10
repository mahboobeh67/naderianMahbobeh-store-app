import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <AdminSidebar isCollapsed={isCollapsed} />

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        <AdminHeader toggleSidebar={handleToggleSidebar} />

        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;


