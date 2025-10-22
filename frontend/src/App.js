import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Login from "./pages/appwrite/login.jsx";
import SignUp from "./pages/appwrite/sign-up.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Skills from "./pages/skills.jsx";
import Post from "./pages/post.jsx";
import Objectives from "./pages/objectives.jsx";
import Industries from "./pages/industries.jsx";
import HowItWorks from "./pages/howItWorks.jsx";
import Pricing from "./pages/pricing.jsx";
import Resources from "./pages/resources.jsx";
import Contact from "./pages/contact.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { JobProvider } from "./context/JobContext.jsx";
import MyJobs from "./pages/MyJobs.jsx";
import Chat from "./pages/Chat.jsx";
import Footer from "./components/Footer.jsx";
import { ThemeContext } from "./context/ThemeContext.js";
import "./style/App.css";
import Follow from "./pages/Follow.jsx";

import Messenger from "./pages/Messenger.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import FindJobs from "./pages/findJobs.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode(!darkMode);

  const location = useLocation();
  const navigate = useNavigate();

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/chat";

  return (
    <AuthProvider>
      <NotificationProvider>

        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
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
                          <Link to="/sign-up" className="get-started-btn">
                            Get Started
                          </Link>
                        </div>
                      </nav>

                      <section className="hero-section">
                        <div className="hero-text">
                          <p className="hero-sub">The future of skill exchange</p>
                          <h1 className="gradient-text">
                            Accelerate Your{" "}
                            <span className="gradient-text">
                              Learning Journey
                            </span>
                          </h1>
                          <p className="hero-desc">
                            Exchange knowledge, earn SkillPoints, and grow with
                            others. Build your network through teaching and
                            learning — powered by community collaboration.
                          </p>
                          <div className="cta-buttons">
                            <button
                              onClick={() => navigate("/sign-up")}
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
                          <div className="bubble mentor">
                            <span>🧠 Mentor</span>
                          </div>
                          <div className="bubble ai">
                            <span>🤖 AI Match</span>
                          </div>
                          <div className="bubble learner">
                            <span>🎓 Learner</span>
                          </div>
                          <div className="bubble network">
                            <span>🌍 Network</span>
                          </div>
                        </div>
                      </section>
                    </main>
                  }
                />

                {/* Zaštićena Home ruta */}
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />

                <Route element={<MainLayout />}>
                  <Route path="/find-jobs" element={<FindJobs />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/mentors" element={<Skills />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/post-job" element={<Post />} />
                  <Route path="/my-jobs" element={<MyJobs />} />
                  <Route path="/messenger" element={<Messenger />} />
                  <Route path="/follow" element={<Follow />} />
                </Route>
                <Route path="/objectives" element={<Objectives />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </JobProvider>

            <Footer />
          </div>
        </ThemeContext.Provider>
      </NotificationProvider>
    </AuthProvider>

  );
};

export default App;
