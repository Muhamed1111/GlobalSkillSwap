import React, { useContext } from "react";
import "./footer.css";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className="landing-footer">
      <p>© 2025 GlobalSkillSwap | Built for knowledge sharing</p>
      <button onClick={toggleTheme} className="theme-toggle">
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </footer>
  );
};

export default Footer;
