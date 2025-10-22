import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Login from "./appwrite/login";
import SignIn from "./appwrite/sign-up";
import Table from "../components/Table";
import Chart from "../components/Chart";
import Button from "../components/Button";
import { JobProvider } from "../context/JobContext";
import "../style/home.css";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../routes/ProtectedRoute";
import { getLeaderBoard } from "../services/pointsLedger";
import { getMyScore } from "../services/pointsLedger";


const head = ["UserName", "Email", "SkillPoints"];
const fields = ["username", "email", "points"];


const Home = () => {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/appwrite/");
  const navigate = useNavigate();
  const { user: loggedUser, logout } = useContext(AuthContext);
  const [leaderBoard, setLeaderBoard] = useState([]);
  // 🧠 Lokalne state varijable za score podatke
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchedData = async () =>{
      try{
        const lBoard = await getLeaderBoard();
        setLeaderBoard(lBoard);
      }catch(err){
        console.error("Greška pri dohvacanju leaderBoarda:",err);
      }
    };
    fetchedData();
  },[])
  const filteredLeaderBoard = [...leaderBoard].sort(
  (a, b) => b.points - a.points
);
  // 📡 Fetch stvarnih podataka iz backend-a
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyScore();
        setEmail(data.email);
        setScore(data.score);
      } catch (error) {
        console.error("Error fetching score:", error);
        logout(); // ako token ne valja ili istekne
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [logout]);

  const userPosition = filteredLeaderBoard.findIndex((i)=>
  i.email===loggedUser) + 1;

  // 🧩 Ako je login ili sign-up ruta — bez layouta
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
                      {email || loggedUser || "Guest"}
                    </span>
                    ! <br />
                    {loading ? (
                      <span>Loading your stats...</span>
                    ) : (
                      <>
                        Your current score{" "}
                        <span
                          style={{ color: "#FFD700", fontWeight: "bold" }}
                        >
                          {score} SkillPoints
                        </span>
                        , which makes you{" "}
                        <span
                          style={{ color: "#FFD700", fontWeight: "bold" }}
                        >
                          {userPosition}. ranked mentor
                        </span>{" "}
                        this week. 🚀
                      </>
                    )}
                  </h3>
                </div>

                <br />
                <Chart />

                <section className="actions-section">
                  <h2 className="actions-title">
                    What do you want to do today?
                  </h2>
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
                  array={leaderBoard}
                />
                <Table
                  title="Leaderboard"
                  head={head}
                  fields={fields}
                  array={filteredLeaderBoard}
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
          
        </Route>
      </Routes>
    </JobProvider>
  );
};

export default Home;
