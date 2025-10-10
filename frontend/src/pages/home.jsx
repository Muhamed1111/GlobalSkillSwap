import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import About from "../pages/about";
import Skills from "../pages/skills";
import Profile from "../pages/profile";
import Contact from "../pages/contact";
import Login from "./appwrite/login";
import SignIn from "./appwrite/sign-in";

const Home = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Stranice gdje se ne prikazuje sidebar
  const hideLayout =
    location.pathname === "/appwrite/login" ||
    location.pathname === "/appwrite/sign-in";

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="app">
      {/* Dugme za otvaranje/zatvaranje sidebar-a */}
      {!hideLayout && (
        <button
          onClick={toggleSidebar}
          className="menu-toggle-btn"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      {!hideLayout && (
        <Sidebar active={sidebarOpen} onMenuToggle={toggleSidebar}  />
      )}

      {/* Navigacija */}
      {!hideLayout && (
        <nav
          style={{
            padding: "10px",
            margin: "10px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link to="/about">About</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/appwrite/sign-in">Sign In</Link>
          <Link to="/appwrite/login">Log In</Link>
        </nav>
      )}

      {/* Rute */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appwrite/sign-in" element={<SignIn />} />
        <Route path="/appwrite/login" element={<Login />} />
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Home;
