import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import MenuHeader from "../components/MenuHeader";
import ProfileSidebar from "../components/ProfileSidebar";
import "../style/MainLayout.css";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleProfile = () => setProfileOpen((prev) => !prev);

  return (
    <div className="layout-container">
      <MenuHeader onProfileToggle={() => setProfileOpen(true)} />

      <button className="menu-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <Sidebar active={sidebarOpen} onMenuToggle={toggleSidebar} />
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <ProfileSidebar
        active={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <main className={`layout-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
