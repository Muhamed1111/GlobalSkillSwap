import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import About from "../pages/about";
import Skills from "../pages/skills";
import Profile from "../pages/profile";
import Contact from "../pages/contact";
import Login from "./appwrite/login";
import SignIn from "./appwrite/sign-in";
import Button from "../components/Button";
import Table from "../components/Table";
import "../App.css"
const user = {
    name:"Muha",
    lastName:"Mujic"
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

    {/*home content*/}
    <div>
        <h3>
            👋 Dobrodošao nazad, Ajdine!
Imaš trenutno 145 SkillPoints, što te svrstava među Top 10% mentora ove sedmice.
Nastavi graditi svoj profil — tvoje znanje vrijedi!
        </h3>
<div>

    <div>
        Graf
    </div>

   
    <section className="actions-grid">
    <Button text="🧠 Offer lesson"/>
    <Button text="🎯 Reserve lesson"/>
    <Button text="💬 Job requests" /> 
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
            head = {head}
            fields = {fields}
            array = {data}      
            user = {user}/>
    <Table title="Top mentors" 
            head = {head}
            fields = {fields}
            array = {data}      
            user = {user}/>

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
        <Sidebar active={sidebarOpen} onMenuToggle={toggleSidebar}  />
      )}

      

      {/* Rute */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appwrite/sign-in" element={<SignIn />} />
        <Route path="/appwrite/login" element={<Login />} />
       
      </Routes>
    </div>
  );
};

export default Home;
