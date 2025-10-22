import { Link, useLocation } from "react-router-dom";
import "../style/MenuHeader.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect, useRef } from "react";
import Notification from "./Notification";
import { notifyNumber } from "./Notification";
const MenuHeader = ({ onProfileToggle }) => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifRef = useRef(null); 

  
  const isActive = (path) => (location.pathname === path ? "active-link" : "");


  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        !event.target.closest(".notification-icon")
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <div className="notification-icon" onClick={toggleNotifications}>
          <i className="fas fa-bell"></i>
          <span className="notification-badge">{notifyNumber}</span>
          {showNotifications && (
            <div ref={notifRef}>
              <Notification />
            </div>
          )}
        </div>

        {/* 👤 Profil */}
        <button className="profile-btn" onClick={onProfileToggle}>
          <i className="fas fa-user-circle"></i> Profile
        </button>

      </div>
    </header>
  );
};

export default MenuHeader;