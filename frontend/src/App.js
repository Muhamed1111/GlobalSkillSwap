
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
  
import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      {/* HEADER */}
      <Header
        title="Global Skill Swap"
        font="italic"
        size="2.5rem"
        color="#FFD700"
      />


      {/* GLAVNI SADRŽAJ */}
      <main className={`main-content`}>
        <div className="content-box">
          <h2>Welcome to Global Skill Swap</h2>
          <p>
            Discover and exchange skills worldwide. Connect, learn, and grow
            together in a global network of passionate learners.
          </p>
          <button className="action-btn">Explore Now</button>
        </div>
      </main>

    </div>
  );
};

export default App;
