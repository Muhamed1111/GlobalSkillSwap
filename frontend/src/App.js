import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/appwrite/login";
import SignIn from "./pages/appwrite/sign-in";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import Skills from "./pages/skills";
import Profile from "./pages/profile";
import Post from "./pages/post";
import Button from "./components/Button";

const App = () => {
  const [color, setColor] = useState("white");
  const location = useLocation();

  // 🔹 Stranice gdje se NE prikazuje header
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/sign-in" ||
    location.pathname === "/home" ||
    location.pathname === "/about" ||
    location.pathname === "/skills" ||
    location.pathname === "/post" ||
    location.pathname === "/profile";

  // 🔹 Promjena teme
  const toDarkTheme = () => {
    document.body.style.backgroundColor = "#1e1e2f";
    setColor("#1e1e2f");
  };

  const toLightTheme = () => {
    document.body.style.backgroundColor = "white";
    setColor("white");
  };

  return (
    <div className="app" style={{ backgroundColor: color, minHeight: "100vh" }}>
      {!hideHeader && (
        <Header
          title="Global Skill Swap"
          font="italic"
          size="2.5rem"
          color="#FFD700"
        />
      )}
  
      <Routes>
        <Route
          path="/"
          element={
            <main className="main-content">
              <div className="content-box">
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                  
                </div>
                <h2>Welcome to Global Skill Swap</h2>
                <p>
                  Discover and exchange skills worldwide. Connect, learn, and
                  grow together in a global network of passionate learners.
                </p>
                <button className="action-btn">Explore Now</button>
              </div>
            </main>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
    </div>
  );
};

export default App;
