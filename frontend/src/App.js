import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/sidebar";

// Stranice
import Home from "./pages/home";
import About from "./pages/about";
import Skills from "./pages/skills";
import Profile from "./pages/profile";
import SignIn from "./pages/appwrite/sign-in";
import Login from "./pages/appwrite/login";

const App = () => {
  const location = useLocation();

  // Rute gdje se NE prikazuje header/sidebar
    const hideLayout =location.pathname === "/appwrite/login" 
    || location.pathname === "/appwrite/sign-in";

  return (
    <div className="app">
      {/* Header i Sidebar samo ako nije login stranica */}
      {!hideLayout && (
        <>
          <Header
            title="Global Skill Swap"
            font="italic"
            size="3rem"
            color="green"
          />
          <Sidebar active={true} />
        </>
      )}

      {/* Navigacija (također skrivena na loginu) */}
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
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/appwrite/sign-in">Sign In</Link>
          <Link to="/appwrite/login">Log In</Link>
        </nav>
      )}

      {/* Rute */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/profile" element={<Profile />} />
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

export default App;
