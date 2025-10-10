import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/appwrite/login";
import SignIn from "./pages/appwrite/sign-in"; // 🔹 Dodaj ovu liniju
import "./App.css";
import Home from "./pages/home";

const App = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/sign-in" || location.pathname === "/home";

  return (
    <div className="app">
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
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login />} />     
        <Route path="/sign-in" element={<SignIn />} />   
      </Routes>
    </div>
  );
};

export default App;
