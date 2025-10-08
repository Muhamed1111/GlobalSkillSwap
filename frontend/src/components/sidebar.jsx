import React from "react";
import "../App.css"

const Sidebar = ({ active ,onMenuToggle}) => {
  return (
    <div className={`sidebar ${active ? "active" : "hidden"}`}>
      <h2 className="sidebar-title">Menu</h2>
      <button className="menu-btn" onClick={onMenuToggle} style={{position:"absolute", right:"10px"}}>
          ☰
        </button>
      <nav className="sidebar-nav">
        <a href="/home">🏠 Home</a>
        <a href="/how">⚙️ How it Works</a>
        <a href="/about">ℹ️ About</a>
        <a href="/skills">💡 Skills</a>
        <a href="/post">📝 Post</a>
        <a href="/profile">👤 Profile</a>
        <button className="signin-btn">
          <a href="/sign_in">Sign In</a>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
