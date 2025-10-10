import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Header.css"
const Header = ({ title, font, size, color }) => {
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
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <Link to="/home">
         <button className="login-btn">Home</button>
        </Link>
        <Link to="/login">
          <button className="login-btn">Sign In</button>
        </Link>

        <Link to="/register">
          <button className="register-btn">Register</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
