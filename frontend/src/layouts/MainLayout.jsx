import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import MenuHeader from "../components/MenuHeader";
import "./MainLayout.css";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="layout-container">
      <MenuHeader />

      <button className="menu-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <Sidebar active={sidebarOpen} onMenuToggle={toggleSidebar} />

      <main
        className={`layout-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Outlet /> {/* 👈 Ovde React ubacuje tvoje stranice */}
      </main>
    </div>
  );
};

export default MainLayout;
