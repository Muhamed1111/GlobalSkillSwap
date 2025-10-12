import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">
          <Link to="/" className="logo-link">
            GlobalSkillSwap
          </Link>
        </h1>

        <nav className="top-menu">
          <Link to="/objectives" className={isActive("/objectives")}>Objectives</Link>
          <Link to="/industries" className={isActive("/industries")}>Industries</Link>
          <Link to="/how-it-works" className={isActive("/how-it-works")}>How it Works</Link>
          <Link to="/pricing" className={isActive("/pricing")}>Pricing</Link>
          <Link to="/resources" className={isActive("/resources")}>Resources</Link>
          <Link to="/contact" className={isActive("/contact")}>Contact</Link>
        </nav>
      </div>

      <div className="header-right">
        <Link to="/home" className={`nav-btn ${isActive("/home")}`}>Home</Link>
        <Link to="/login" className={`nav-btn ${isActive("/login")}`}>Sign In</Link>
        <Link to="/sign-in" className={`get-started-btn ${isActive("/sign-in")}`}>Register</Link>
      </div>
    </header>
  );
};

export default Header;
