import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">
          <Link to="/" className="logo-link">
            GlobalSkillSwap
          </Link>
        </h1>

        <nav className="top-menu">
          <Link to="/objectives" className={isActive("/objectives")}>
            Objectives
          </Link>
          <Link to="/industries" className={isActive("/industries")}>
            Industries
          </Link>
          <Link to="/how-it-works" className={isActive("/how-it-works")}>
            How it Works
          </Link>
          <Link to="/pricing" className={isActive("/pricing")}>
            Pricing
          </Link>
          <Link to="/resources" className={isActive("/resources")}>
            Resources
          </Link>
          <Link to="/contact" className={isActive("/contact")}>
            Contact
          </Link>
        </nav>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <Link to="/home" className={`nav-btn ${isActive("/home")}`}>
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="nav-btn"
              style={{
                background: "transparent",
                border: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={`nav-btn ${isActive("/login")}`}>
              Login
            </Link>
            <Link
              to="/sign-up"
              className={`get-started-btn ${isActive("/sign-up")}`}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
