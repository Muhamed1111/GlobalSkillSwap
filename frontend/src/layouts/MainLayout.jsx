import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import MenuHeader from "../components/MenuHeader";
import "./MainLayout.css";
import Profile from "../components/profile";
import ProfileSidebar from "../components/ProfileSidebar";
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
  };
  return (
    <div className="layout-container">
      <MenuHeader onProfileToggle={() => setProfileOpen(true)} />

      <button className="menu-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <Sidebar active={sidebarOpen} onMenuToggle={toggleSidebar} />
      <ProfileSidebar
      active={profileOpen}
      onClose={() => setProfileOpen(false)}
    />
      <main
        className={`layout-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Outlet /> {/* 👈 Ovde React ubacuje tvoje stranice */}
      </main>
    </div>
  );
};

export default MainLayout;
