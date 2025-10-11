import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MenuHeader.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


const MenuHeader = () => {
  const location = useLocation();

  // Aktivni link
  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <header className="menu-header">
      <div className="header-left">
        <h1 className="logo">
          <Link to="/" className="logo-link">
            <span className="gold-text">GLOBAL</span> SKILL SWAP
          </Link>
        </h1>

        <nav className="top-menu">
          <Link to="/about" className={isActive("/about")}>About</Link>
          <Link to="/skills" className={isActive("/skills")}>Skills</Link>
          <Link to="/how-it-works" className={isActive("/how-it-works")}>How it Works</Link>
          <Link to="/contact" className={isActive("/contact")}>Contact</Link>
        </nav>
      </div>

      <div className="header-right">
      {/* 🔔 Notifikacije */}
      <div className="notification-icon">
        <i className="fas fa-bell"></i>
        <span className="notification-badge">3</span>
      </div>

      {/* 👤 Profil */}
      <Link to="/profile" className="profile-btn">
        <i className="fas fa-user-circle"></i> Profile
      </Link>

      {/* 🚪 Logout */}
      <Link to="/" className="logout-btn">
        <i className="fas fa-sign-out-alt" to="/"></i> Log Out
      </Link>

</div>
    </header>
  );
};

export default MenuHeader;
