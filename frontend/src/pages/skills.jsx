import React, { useEffect, useRef, useState } from "react";
import MenuHeader from "../components/MenuHeader";
import Sidebar from "../components/sidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileCard from "../components/profile";
import "../style/skills.css";
import Chat from "./Chat";
import { getMentors } from "../services/userApi";
import { parseJwt } from "../components/ProfileSidebar";
const Skills = () => {
  const scrollRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [activeUser,setActiveUser]=useState(null);
  // 🔹 Dummy podaci
  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const data = parseJwt(token);
        setActiveUser(data);
        
      }
    }, []);
  console.log(activeUser);
  useEffect(() => {
    const fetchedMentors = async () => {
      try {
        const data = await getMentors();
        const formatted = data.map((u, index) => ({


          id: index,
          name: u.username || "Unknown",
          email: u.email,
          points: u.points || 0,
          lessons: Math.floor(Math.random * 30) + 1,
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
          bio: "Mentor ready to exchange skills and knowledge with others.",
          avatar: `https://i.pravatar.cc/200?img=${index + 3}`,


        })
        );
        setUsers(formatted);
      } catch (err) {
        console.error("Greška pri dohvaćanju mentora:", err);
      }
    }
    fetchedMentors();
  }, []);


  const sortedMentors = [...users].sort((a, b) => b.points - a.points);  
  const filteredUsers = sortedMentors.filter((mentor) => mentor.email !== activeUser.sub);

  // 🔹 Scroll funkcije
  const scrollLeft = () => scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });

  // 🔹 Toggle funkcije
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleProfile = () => setProfileOpen((prev) => !prev);

  return (
    <div >
      <MenuHeader onProfileToggle={() => setProfileOpen(true)} />


      {/* Profile sidebar */}
      {profileOpen && (
        <ProfileSidebar active={profileOpen} onClose={() => setProfileOpen(false)} />
      )}

      {/* Glavni sadržaj */}
      <div
        className="skills-main"
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
            {filteredUsers.map((user, index) => (
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

  
    </div>
  );
};
export default Skills;

