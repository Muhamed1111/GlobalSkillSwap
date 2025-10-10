import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../pages/appwrite/signIn.css"
const Sidebar = ({ active, onMenuToggle }) => {
  return (
    <div className={`sidebar ${active ? "active" : "hidden"}`}>
      <h2 className="sidebar-title">Menu</h2>

      <nav className="sidebar-nav">
        <Link to="/home" onClick={onMenuToggle}>🏠 Home</Link>
        <Link to="/how" onClick={onMenuToggle}>⚙️ How it Works</Link>
        <Link to="/about" onClick={onMenuToggle}>ℹ️ About</Link>
        <Link to="/skills" onClick={onMenuToggle}>💡 Skills</Link>
        <Link to="/post" onClick={onMenuToggle}>📝 Post</Link>
        <Link to="/profile" onClick={onMenuToggle}>👤 Profile</Link>

       
        <Link className="bottom-link" to="/">Log Out</Link>
        
      </nav>
    </div>
  );
};

export default Sidebar;
