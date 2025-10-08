import React from "react";
import "../App.css";

const Header = ({ title, font, size, color, onMenuToggle }) => {
  return (
    <header
      className="header"
      style={{
        fontStyle: font,
        fontSize: size,
        background:
          "linear-gradient(90deg, #3c300dff 20%, #514f03ff 60%, #988e34ff 100%)",
        color: color || "#FFD700",
      }}
    >
      <div className="header-left">
        {/* <button className="menu-btn" onClick={onMenuToggle}>
          ☰
        </button> */}
        <h1 className="header-title">{title}</h1>
      </div>

      {/* GRUPISANE DUGMADI */}
      <div className="header-right">
        <button className="login-btn">Sign In</button>
        <button className="register-btn">Register</button>
      </div>
    </header>
  );
};

export default Header;
