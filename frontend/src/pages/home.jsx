import React, { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import About from "../pages/about";
import Skills from "../pages/skills";
import Profile from "../components/ProfileModal";
import Contact from "../pages/contact";
import Login from "./appwrite/login";
import SignIn from "./appwrite/sign-in";
import Button from "../components/Button";
import Table from "../components/Table";
import Chart from "../components/Chart";
import "../App.css"
import MenuHeader from "../components/MenuHeader";
import ProfileSidebar from "../components/ProfileSidebar";
import Chat from "./Chat";


const user = {
  name: "Muha",
  lastName: "Mujic"
}

const head = ["Ime", "Prezime", "Bodovi"];
const fields = ["name", "lastName", "points"];

const data = [
  { name: "Muhamed", lastName: "Mujić", points: 120 },
  { name: "Ajdin", lastName: "Alihodžić", points: 95 },
  { name: "Amar", lastName: "Hodžić", points: 180 },
];

const Home = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();


  // Stranice gdje se ne prikazuje sidebar
  const hideLayout =
    location.pathname === "/appwrite/login" ||
    location.pathname === "/appwrite/sign-in";

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

   const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
  };

  return (
    <div className="app">
        <MenuHeader onProfileToggle={() => setProfileOpen(true)} />

      {/*home content*/}
      <div style={{ marginTop: "80px" }}>
        <div
          style={{
            //background: "linear-gradient(90deg, rgba(40,40,40,0.9), rgba(0,0,0,0.95))",
            background: "linear-gradient(90deg, #190e53ff, #8f70ff)",
            border: "1px solid rgba(255,215,0,0.3)",
            boxShadow: "0 0 10px rgba(255,215,0,0.2)",
            padding: "20px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h3 style={{ lineHeight: "1.6" }}>
            👋 Dobrodošao nazad, <span style={{ color: "#FFD700" }}>Ajdine</span>! <br />
            Trenutno imaš{" "}
            <span style={{ color: "#FFD700", fontWeight: "bold" }}>145 SkillPoints</span>,
            što te svrstava među{" "}
            <span style={{ color: "#FFD700", fontWeight: "bold" }}>Top 10% mentora</span> ove sedmice. <br />
            Nastavi dijeliti svoje znanje — tvoj trud i iskustvo prave razliku! 🚀
          </h3>
        </div>
          <br/>
        <div>

          <div>
            <Chart>Graf</Chart>
          </div>

<section className="actions-section">
      <h2 className="actions-title">Šta želiš danas uraditi?</h2>
      <div className="actions-grid">
        <Button 
          text="🧠 Offer lesson"
          onClick={()=>navigate("/post")}
          />
        <Button
          text="🎯 Reserve lesson"
          onClick={() => navigate("/skills")} 
        />
        <Button text="💬 Job requests" />
      </div>
    </section>


          <section className="stats-section">
            <h2>Tvoj napredak</h2>
            <div className="stats-cards">
              <div>320 Bodova</div>
              <div>8 Časova</div>
              <div>Ocjena 4.9 ⭐</div>
            </div>
          </section>



          {/* cards */}


  
          <Table title="Suggested mentors"
            head={head}
            fields={fields}
            array={data}
            user={user} />
            
          <Table title="Top mentors"
            head={head}
            fields={fields}
            array={data}
            user={user} />

        </div>

      </div>

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
        <Sidebar active={sidebarOpen} onMenuToggle={toggleSidebar} />
      )}
      
 {profileOpen && (
  <ProfileSidebar
    active={profileOpen}
    onClose={() => setProfileOpen(false)}
  />
)}
     


      {/* Rute */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appwrite/sign-in" element={<SignIn />} />
        <Route path="/appwrite/login" element={<Login />} />
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </div>
  );
};

export default Home;