import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/about";
import Skills from "../pages/skills";
import Contact from "../pages/contact";
import Login from "./appwrite/login";
import SignIn from "./appwrite/sign-up";
import Table from "../components/Table";
import Chart from "../components/Chart";
import Button from "../components/Button";
import { JobProvider } from "../context/JobContext";
import Post from "./post";
import MyJobs from "./MyJobs";
import "./home.css";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../routes/ProtectedRoute";

const user = { name: "Muha", lastName: "Mujic" };
const head = ["Ime", "Prezime", "Bodovi"];
const fields = ["name", "lastName", "points"];
const data = [
  { name: "Muhamed", lastName: "Mujić", points: 120 },
  { name: "Ajdin", lastName: "Alihodžić", points: 95 },
  { name: "Amar", lastName: "Hodžić", points: 180 },
];

const Home = () => {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/appwrite/");
  const navigate = useNavigate();
  const { user: loggedUser, logout } = useContext(AuthContext);

  // 🧩 Ako je login ili sign-in, ne prikazuj layout
  if (hideLayout) {
    return (
      <Routes>
        <Route path="/appwrite/login" element={<Login />} />
        <Route path="/appwrite/sign-in" element={<SignIn />} />
      </Routes>
    );
  }

  // 🌟 Sve ostalo ide kroz glavni layout
  return (
    <JobProvider>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <>
                <div
                  style={{
                    background: "linear-gradient(90deg, #190e53ff, #8f70ff)",
                    border: "1px solid rgba(255,215,0,0.3)",
                    boxShadow: "0 0 10px rgba(255,215,0,0.2)",
                    padding: "20px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <h3 className="title-h3">
                    👋 Welcome,{" "}
                    <span style={{ color: "#FFD700" }}>
                      {loggedUser || "Guest"}
                    </span>
                    ! <br />
                    Your current score{" "}
                    <span style={{ color: "#FFD700", fontWeight: "bold" }}>
                      145 SkillPoints
                    </span>
                    , which makes you{" "}
                    <span style={{ color: "#FFD700", fontWeight: "bold" }}>
                      Top 10% mentors
                    </span>{" "}
                    this week. 🚀
                  </h3>
                </div>

                <br />
                <Chart />

                <section className="actions-section">
                  <h2 className="actions-title">What do you want to do today?</h2>
                  <div className="actions-grid">
                    <Button
                      text="🧠 Offer lesson"
                      onClick={() => navigate("/post")}
                    />
                    <Button
                      text="🎯 Reserve lesson"
                      onClick={() => navigate("/skills")}
                    />
                    <Button
                      text="💬 My Jobs"
                      onClick={() => navigate("/my-jobs")}
                    />
                  </div>
                </section>

                <Table
                  title="Suggested mentors"
                  head={head}
                  fields={fields}
                  array={data}
                  user={user}
                />
                <Table
                  title="Top mentors"
                  head={head}
                  fields={fields}
                  array={data}
                  user={user}
                />

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button
                    text="🚪 Logout"
                    color="#ff5050"
                    hoverColor="#ff0000"
                    onClick={logout}
                  />
                </div>

                
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post" element={<Post />} />
          <Route path="/my-jobs" element={<MyJobs />} />
        </Route>
      </Routes>
    </JobProvider>
  );
};

export default Home;
