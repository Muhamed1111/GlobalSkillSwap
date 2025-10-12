import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/appwrite/login";
import SignIn from "./pages/appwrite/sign-in";
import Home from "./pages/home";
import About from "./pages/about";
import Skills from "./pages/skills";
import Profile from "./pages/profile";
import Post from "./pages/post";
import "./App.css";
import Objectives from "./pages/objectives";
import Industries from "./pages/industries";
import HowItWorks from "./pages/howItWorks";
import Pricing from "./pages/pricing";
import Resources from "./pages/resources";
import Contact from "./pages/contact";
import MainLayout from "./layouts/MainLayout";
import { JobProvider } from "./context/JobContext";
import MyJobs from "./pages/MyJobs";
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  // Stranice bez headera
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/sign-in" ||
    location.pathname === "/home" ||
    location.pathname === "/about" ||
    location.pathname === "/skills" ||
    location.pathname === "/post" ||
    location.pathname === "/profile";

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`app-container ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      {!hideHeader && (
        <Header
          title="Global Skill Swap"
          font="italic"
          size="2.5rem"
          color="blue"
        />
      )}
      <JobProvider>
        <Routes>
          {/* 🌍 Landing Page */}
          <Route
            path="/"
            element={
              <main className="landing-page">
                <nav className="top-nav">
                  <div className="logo">GlobalSkillSwap</div>
                  <div className="nav-links">
                    <Link to="/about">About</Link>
                    <Link to="/skills">Skills</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/sign-in" className="get-started-btn">
                      Get Started
                    </Link>
                  </div>
                </nav>

                <section className="hero-section">
                  <div className="hero-text">
                    <p className="hero-sub">The future of skill exchange</p>
                    <h1 className="gradient-text">
                      Accelerate Your{" "}
                      <span className="gradient-text">Learning Journey</span>
                    </h1>
                    <p className="hero-desc">
                      Exchange knowledge, earn SkillPoints, and grow with others.
                      Build your network through teaching and learning — powered by
                      community collaboration.
                    </p>
                    <div className="cta-buttons">
                      <button
                        onClick={() => navigate("/sign-in")}
                        className="primary-btn"
                      >
                        Join Now
                      </button>
                      <button
                        onClick={() => navigate("/login")}
                        className="secondary-btn"
                      >
                        Log In
                      </button>
                    </div>
                  </div>

                  <div className="floating-elements">
                    <div className="bubble mentor"><span>🧠 Mentor</span></div>
                    <div className="bubble ai"><span>🤖 AI Match</span></div>
                    <div className="bubble learner"><span>🎓 Learner</span></div>
                    <div className="bubble network"><span>🌍 Network</span></div>
                  </div>

                </section>

                <footer className="landing-footer">
                  <p>© 2025 GlobalSkillSwap | Built for knowledge sharing</p>
                  <button onClick={toggleTheme} className="theme-toggle">
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                  </button>
                </footer>
              </main>
            }
          />

          {/* 📄 Ostale rute */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/post" element={<Post />} />

            <Route path="/my-jobs" element={<MyJobs />} />
          </Route>
          <Route path="/objectives" element={<Objectives />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />


        </Routes>
      </JobProvider>
    </div>
  );
};

export default App;