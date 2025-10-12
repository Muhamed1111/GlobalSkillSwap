import React, { useRef, useState } from "react";
import MenuHeader from "../components/MenuHeader";
import Sidebar from "../components/sidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileCard from "../components/profile";
import "./skills.css";
import Chat from "./Chat";


const Skills = () => {
  const scrollRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState(null);

  // 🔹 Dummy podaci
  const users = [
    {
      id:568,
      name: "Ajdin Alihodžić",
      email: "ajdin@example.com",
      points: 320,
      lessons: 8,
      rating: 4.9,
      bio: "Frontend developer & mentor passionate about teaching React, UX/UI design and modern web development.",
      avatar: "https://i.pravatar.cc/200?img=3",
    },
    {
      id:565,
      name: "Muhamed Mujić",
      email: "mujic@example.com",
      points: 652,
      lessons: 33,
      rating: 4.5,
      bio: "Frontend developer focused on modern UX/UI design and mentoring junior developers.",
      avatar: "https://i.pravatar.cc/200?img=4",
    },
    {
      id: 156,
      name: "Zemo Mujić",
      email: "zemo@example.com",
      points: 54,
      lessons: 2,
      rating: 4.4,
      bio: "Backend developer specializing in Node.js and API architecture.",
      avatar: "https://i.pravatar.cc/200?img=5",
    },
    {
      id:123,
      name: "Emina Hadžić",
      email: "emina@example.com",
      points: 415,
      lessons: 17,
      rating: 4.8,
      bio: "UI/UX designer with a passion for intuitive and accessible design.",
      avatar: "https://i.pravatar.cc/200?img=7",
    },
  ];

  // 🔹 Scroll funkcije
  const scrollLeft = () => scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });

  // 🔹 Toggle funkcije
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleProfile = () => setProfileOpen((prev) => !prev);

  return (
    <div className="app">
      <MenuHeader onProfileToggle={() => setProfileOpen(true)} />

      {/* Sidebar */}
      <Sidebar active={sidebarOpen} onMenuToggle={toggleSidebar} />

      {/* Profile sidebar */}
      {profileOpen && (
        <ProfileSidebar active={profileOpen} onClose={() => setProfileOpen(false)} />
      )}

      {/* Glavni sadržaj */}
      <div
        className="skills-main"
        style={{
          marginLeft: sidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* 🔹 Filter sekcija */}
        <div className="filter-bar">
          <h2>🎯 Find Mentors</h2>
          <div className="filter-controls">
            <input type="text" placeholder="Search by skill..." />
            <select>
              <option value="">All categories</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="design">Design</option>
            </select>
            <button className="filter-btn">Filter</button>
          </div>
        </div>

        {/* 🔹 Carousel sekcija */}
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={scrollLeft}>◀</button>
          <div className="profiles-carousel" ref={scrollRef}>
            {users.map((user, index) => (
  <ProfileCard key={index} user={user} onChatOpen={setActiveChatUser} />
))}

          </div>
          <button className="carousel-btn right" onClick={scrollRight}>▶</button>
        </div>
      </div>


          {activeChatUser && (
        <div className="chat-popup">
          <div className="chat-popup-header">
            <h3>Chat with {activeChatUser.name}</h3>
            <button onClick={() => setActiveChatUser(null)}>✖</button>
          </div>
          <Chat recipient={activeChatUser.name} />
        </div>
      )}

      {/* Dugme za otvaranje sidebar-a */}
      <button onClick={toggleSidebar} className="menu-toggle-btn">☰</button>
    </div>
  );
};
export default Skills;

